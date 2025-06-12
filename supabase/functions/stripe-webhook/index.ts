
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "sk_test_placeholder", {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { persistSession: false } }
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || "whsec_placeholder"
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get user ID and credits from metadata
        const userId = session.metadata?.user_id;
        const credits = parseInt(session.metadata?.credits || "0");
        
        if (!userId || !credits) {
          console.error("Missing user_id or credits in session metadata");
          break;
        }

        // Update payment log
        await supabase
          .from("payment_logs")
          .update({
            status: "completed",
            credits_added: credits,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_session_id", session.id);

        // Add credits to user's wallet
        const { data: wallet } = await supabase
          .from("wallets")
          .select("balance")
          .eq("user_id", userId)
          .single();

        if (wallet) {
          await supabase
            .from("wallets")
            .update({
              balance: wallet.balance + credits,
              last_updated: new Date().toISOString(),
            })
            .eq("user_id", userId);
        } else {
          // Create wallet if it doesn't exist
          await supabase
            .from("wallets")
            .insert({
              user_id: userId,
              balance: credits,
              status: "active",
            });
        }

        // Log the transaction
        await supabase
          .from("wallet_transactions")
          .insert({
            user_id: userId,
            wallet_id: wallet?.id || null,
            transaction_type: "credit",
            amount: credits,
            description: `Added ${credits} credits via Stripe payment`,
            reference_id: session.id,
            reference_type: "stripe_payment",
            status: "completed",
          });

        console.log(`Successfully added ${credits} credits to user ${userId}`);
        break;

      case "checkout.session.expired":
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        
        // Update payment log to expired
        await supabase
          .from("payment_logs")
          .update({
            status: "expired",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_session_id", expiredSession.id);
        
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }
});

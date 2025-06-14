import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SchedulePayload = {
  leadId: string;
  message: string;
  sendAt: string; // ISO format
  method: "whatsapp" | "sms" | "email";
};

export function useScheduleCrmMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scheduleMessage = async (payload: SchedulePayload) => {
    setLoading(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("crm_scheduled_messages")
      .insert([
        {
          lead_id: payload.leadId,
          message: payload.message,
          send_at: payload.sendAt,
          method: payload.method
        }
      ]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  };

  return {
    scheduleMessage,
    loading,
    error
  };
}

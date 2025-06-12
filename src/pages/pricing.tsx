
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      credits: 250,
      features: ["AI Resume Builder", "Basic Property Search", "Contact Agents", "Email Support"]
    },
    {
      name: "Pro",
      price: "₹2499",
      credits: 750,
      popular: true,
      features: ["Everything in Basic", "AI Pricing Suggestions", "Video Generation", "Brochure Parser", "Priority Support"]
    },
    {
      name: "Enterprise",
      price: "₹4999",
      credits: 2000,
      features: ["Everything in Pro", "Unlimited AI Tools", "Custom Integrations", "Dedicated Support", "Analytics Dashboard"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Get access to powerful AI tools for real estate</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-orange-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-500 text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-orange-600 my-4">{plan.price}</div>
                <p className="text-gray-600">{plan.credits} AI Credits</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;

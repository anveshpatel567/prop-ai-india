import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ScheduledMessage = {
  message: string;
  sendAt: string; // ISO date string
  method: "email" | "sms" | "whatsapp";
};

export default function ScheduledMessageEditor({
  onSave
}: {
  onSave: (msg: ScheduledMessage) => void;
}) {
  const [message, setMessage] = useState("");
  const [sendAt, setSendAt] = useState("");
  const [method, setMethod] = useState<ScheduledMessage["method"]>("whatsapp");

  const handleSubmit = () => {
    if (!message || !sendAt) return;
    onSave({ message, sendAt, method });
  };

  return (
    <div className="space-y-4 border rounded-xl p-4 shadow bg-white">
      <h2 className="text-lg font-semibold">Schedule a CRM Message</h2>
      <Textarea
        placeholder="Type your message to the lead..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Input
        type="datetime-local"
        value={sendAt}
        onChange={(e) => setSendAt(e.target.value)}
      />
      <select
        className="border p-2 rounded w-full"
        value={method}
        onChange={(e) => setMethod(e.target.value as ScheduledMessage["method"])}
      >
        <option value="whatsapp">WhatsApp</option>
        <option value="sms">SMS</option>
        <option value="email">Email</option>
      </select>
      <Button onClick={handleSubmit} disabled={!message || !sendAt}>
        Save Message
      </Button>
    </div>
  );
}

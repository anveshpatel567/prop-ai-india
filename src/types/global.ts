
export type UserRole = "seeker" | "owner" | "agent" | "rera_agent" | "builder" | "admin";

export const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "seeker", label: "Property Seeker" },
  { value: "owner", label: "Property Owner" },
  { value: "agent", label: "Real Estate Agent" },
  { value: "rera_agent", label: "RERA Certified Agent" },
  { value: "builder", label: "Builder/Developer" },
  { value: "admin", label: "Administrator" }
];

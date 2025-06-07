
export function getSafeSelectValue(input: string | null | undefined): string {
  return input && input.trim() !== "" ? input : "-";
}

export function getSafeSelectLabel(input: string | null | undefined): string {
  return input && input.trim() !== "" ? input : "Select option";
}

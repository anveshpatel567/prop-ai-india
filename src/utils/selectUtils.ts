
export function getSafeSelectValue(input: string | null | undefined): string {
  return input && input.trim() !== "" ? input : "-";
}

export function getSafeSelectLabel(input: string | null | undefined): string {
  return input && input.trim() !== "" ? input : "Select option";
}

export function isValidSelectOption(option: any): boolean {
  return option && 
         typeof option === 'object' && 
         option.value && 
         typeof option.value === 'string' && 
         option.value.trim() !== '';
}

export function filterValidOptions(options: any[]): any[] {
  if (!Array.isArray(options)) return [];
  return options.filter(isValidSelectOption);
}

export function getSafeOptions(options: any[] | undefined | null): any[] {
  if (!options || !Array.isArray(options)) return [];
  return filterValidOptions(options);
}

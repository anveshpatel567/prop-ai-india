
export interface ParsedBrochureField {
  field_name: string;
  extracted_value: any;
  confidence_score: number;
  status: 'accepted' | 'rejected' | 'edited';
  original_value?: any;
  edited_value?: any;
}

export interface BrochureParseResult {
  id: string;
  filename: string;
  parsed_fields: ParsedBrochureField[];
  raw_text: string;
  parsing_status: 'success' | 'error' | 'partial';
  error_message?: string;
}

export type ParsedData = {
  parsed_fields: {
    field: string;
    value: string;
    confidence: number;
  }[];
  raw_text: string;
};

import { $api } from "@/api/api-clients";

export interface AnalyzeRequestDTO {
  userId: number;
  files: FormData;
}

export interface AnalyzeResponseDTO {
  id: number;
}

export interface AnalyzeResultRequestDTO {
  id: number;
}

export interface AnalyzeResultResponseDTO {
  summary: string;
  normativeDocuments: NormativeDocument[];
  suggestions: Suggestion[];
  highlights: Highlight[];
}

interface NormativeDocument {
  id: string;
  title: string;
  description: string;
  relevance: number;
  sections: string[];
  url: string;
}

interface Suggestion {
  id: string;
  regulation: string;
  articles: string;
  requirement: string;
  status: string;
  action: string;
}

interface Highlight {
  id: string;
  text: string;
  explanation: string;
  regulation: string;
  color: string;
}

export default class AnalyzeService {
  static async analyze(data: AnalyzeRequestDTO): Promise<AnalyzeResponseDTO> {
    const response = await $api.post("/analyze", data);
    return response.data;
  }

  static async getAnalyzeResult({
    id,
  }: AnalyzeResultRequestDTO): Promise<AnalyzeResultResponseDTO> {
    const response = await $api.get<AnalyzeResultResponseDTO>(`/analyze/${id}`);
    return response.data;
  }
}

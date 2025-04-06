import { $api } from "@/api/api-clients";

export interface DocumentAnalysBusiness {
  documentId: string | null;
  analyses: Analys[] | null;
  npas: NpaBusiness[] | null;
}

export interface Analys {
  id: string | null;
  text: string | null;
  explanation: string | null;
  regulation: string | null;
}

export interface NpaBusiness {
  source: string | null;
  distancePercent: number;
}

export default class AnalyseService {
  static async getDocumentAnalysis(id: string): Promise<DocumentAnalysBusiness> {
    const response = await $api.get<DocumentAnalysBusiness>(
      `/api/v1/TechnicalSpecification/${id}/analys`
    );
    return response.data;
  }
}

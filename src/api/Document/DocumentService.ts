import { $api } from "@/api/api-clients";

export interface AnalyzeRequestDTO {
  userId: string;
  fileStream: File;
}

export interface TechnicalSpecDto {
  id: string;
  userId: string | null;
  name: string | null;
  link: string | null;
  description: string | null;
  lastUpdate: string;
  category: string | null;
  status: TechStatus;
}

export enum TechStatus {
  Pending = 0,
  Completed = 1,
}

export interface GetTechnicalSpecsRequestDTO {
  search?: string;
  size?: number;
  page?: number;
}

export interface GetTechnicalSpecsResponseDTO {
  technicalSpecs: TechnicalSpecDto[] | null;
}

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

export default class AnalyzeService {
  static async uploadDocument(userId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append("fileStream", file);

    const response = await $api.post("/api/v1/TechnicalSpecification", formData, {
      params: { userId },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async getDocuments(
    params: GetTechnicalSpecsRequestDTO = {}
  ): Promise<GetTechnicalSpecsResponseDTO> {
    const response = await $api.get<GetTechnicalSpecsResponseDTO>(
      "/api/v1/TechnicalSpecification",
      {
        params: {
          Search: params.search,
          Size: params.size,
          Page: params.page,
        },
      }
    );
    return response.data;
  }

  static async getDocumentById(id: string): Promise<TechnicalSpecDto> {
    const response = await $api.get<TechnicalSpecDto>(`/api/v1/TechnicalSpecification/${id}`);
    return response.data;
  }

  static async getDocumentAnalysis(id: string): Promise<DocumentAnalysBusiness> {
    const response = await $api.get<DocumentAnalysBusiness>(
      `/api/v1/TechnicalSpecification/${id}/analys`
    );
    return response.data;
  }

  static async downloadDocument(id: string): Promise<void> {
    await $api.post(`/api/v1/TechnicalSpecification/${id}/file`);
  }

  static async deleteDocument(id: string): Promise<void> {
    await $api.delete("/api/v1/TechnicalSpecification", {
      params: { id },
    });
  }
}

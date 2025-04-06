import { $api } from "@/api/api-clients";

export interface IKnowlageBase {
  id: string;
  title: string;
  description: string;
  filePath: string;
  lastUpdated: string;
  status: string;
}

export interface ITheme {
  theme: string;
}

export default class NpaService {
  static async getNpa(): Promise<IKnowlageBase> {
    const response = await $api.get<IKnowlageBase>(`/documents/npa`);
    return response.data;
  }

  static async getNpaByTheme(theme: string): Promise<ITheme> {
    const response = await $api.post(
      "/documents/parse-by-theme",
      { query: theme },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
}

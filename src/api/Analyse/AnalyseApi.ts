import { queryOptions, useQuery } from "@tanstack/react-query";
import AnalyseService from "./AnalyseServise";

export const documentAnalysisOptions = (id: string) => {
  return queryOptions({
    queryKey: ["documentAnalysis", id],
    queryFn: () => AnalyseService.getDocumentAnalysis(id),
  });
};

export const useGetDocumentAnalysis = (id: string) => {
  return useQuery({
    queryKey: ["documentAnalysis", id],
    queryFn: () => AnalyseService.getDocumentAnalysis(id),
  });
};

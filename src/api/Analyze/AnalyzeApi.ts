import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import AnalyzeService, { type AnalyzeRequestDTO } from "./AnalyzeService";

export const analyzeResultOptions = (id: string) => {
  return queryOptions({
    queryKey: ["analyzeResult", id],
    queryFn: () => AnalyzeService.getAnalyzeResult({ id }),
  });
};

export const useAnalyze = () => {
  const queryClient = useQueryClient();

  const analyzeMutation = useMutation({
    mutationFn: (data: AnalyzeRequestDTO) => AnalyzeService.analyze(data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["analyzeResult", data.id] });
    },
  });

  return {
    analyzeMutation,
  };
};

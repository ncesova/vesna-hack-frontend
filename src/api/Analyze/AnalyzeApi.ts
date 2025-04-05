import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import AnalyzeService, {
  type AnalyzeRequestDTO,
  type DownloadReportRequestDTO,
} from "./AnalyzeService";

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

// New function for downloading reports
export const useDownloadReport = () => {
  const downloadReportMutation = useMutation({
    mutationFn: (data: DownloadReportRequestDTO) => AnalyzeService.downloadFullReport(data),
    onSuccess: (data, variables) => {
      // Create a download link for the blob
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${variables.id}.${variables.format || "docx"}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
  });

  return {
    downloadReportMutation,
  };
};

import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnalyzeService, { type GetTechnicalSpecsRequestDTO } from "./DocumentService";

export const documentOptions = (id: string) => {
  return queryOptions({
    queryKey: ["document", id],
    queryFn: () => AnalyzeService.getDocumentById(id),
  });
};

export const documentAnalysisOptions = (id: string) => {
  return queryOptions({
    queryKey: ["documentAnalysis", id],
    queryFn: () => AnalyzeService.getDocumentAnalysis(id),
  });
};

export const useGetDocuments = (params: GetTechnicalSpecsRequestDTO = {}) => {
  return useQuery({
    queryKey: ["documents", params],
    queryFn: () => AnalyzeService.getDocuments(params),
  });
};

export const useGetDocument = (id: string) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => AnalyzeService.getDocumentById(id),
  });
};

export const useGetDocumentAnalysis = (id: string) => {
  return useQuery({
    queryKey: ["documentAnalysis", id],
    queryFn: () => AnalyzeService.getDocumentAnalysis(id),
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      AnalyzeService.uploadDocument(userId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  return {
    uploadMutation,
  };
};

export const useDownloadDocument = () => {
  const downloadMutation = useMutation({
    mutationFn: (id: string) => AnalyzeService.downloadDocument(id),
  });

  return {
    downloadMutation,
  };
};

export const useDownloadReport = () => {
  const downloadReportMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => AnalyzeService.downloadDocument(id),
  });

  return {
    downloadReportMutation,
  };
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => AnalyzeService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  return {
    deleteMutation,
  };
};

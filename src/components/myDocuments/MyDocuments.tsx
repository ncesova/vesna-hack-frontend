import {
  useDeleteDocument,
  useDownloadDocument,
  useGetDocuments,
} from "@/api/Document/DocumentApi";
import { TechStatus } from "@/api/Document/DocumentService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MyDocuments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const { data, isLoading, refetch } = useGetDocuments({
    search: searchQuery,
    size: itemsPerPage,
    page: currentPage, // 1-based index
  });

  const { deleteMutation } = useDeleteDocument();
  const { downloadMutation } = useDownloadDocument();

  const documents = data?.technicalSpecs || [];
  const totalDocuments = documents.length;
  const totalPages = Math.max(1, Math.ceil(totalDocuments / itemsPerPage));

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const section = document.getElementById("section-documents");
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Документ удален", {
          description: "Документ был успешно удален",
        });
        refetch();
      },
      onError: () => {
        toast.error("Ошибка", {
          description: "Не удалось удалить документ",
        });
      },
    });
  };

  const handleDownload = (id: string) => {
    downloadMutation.mutate(id, {
      onError: () => {
        toast.error("Ошибка", {
          description: "Не удалось скачать документ",
        });
      },
    });
  };

  const getStatusText = (status: TechStatus) => {
    return status === TechStatus.Completed ? "Проанализировано" : "В обработке";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <Link
        to="/analyze"
        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Вернуться к загрузке
      </Link>
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Мои документы</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Просмотр и управление загруженными документами
        </p>
      </div>

      {/* Секция с документами */}
      <div
        id="section-documents"
        className="bg-white rounded-lg border border-primary shadow-md p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-foreground text-center sm:text-left">
            Загруженные документы
          </h2>
          <Input
            placeholder="Поиск документов..."
            className="w-full sm:max-w-xs border-primary"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название документа</TableHead>
              <TableHead>Дата загрузки</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="h-8 w-8 animate-spin">
                      <svg
                        className="text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-muted-foreground animate-pulse">Загрузка...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <svg
                      className="h-12 w-12 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium text-muted-foreground">
                      Документы отсутствуют
                    </p>
                    <Link
                      to={"/analyze"}
                      className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80"
                    >
                      Загрузите свой первый документ
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              documents.map(doc => (
                <TableRow key={doc.id} className="relative">
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{formatDate(doc.lastUpdate)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-center text-sm ${
                        doc.status === TechStatus.Completed
                          ? "bg-primary/10 text-primary"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {getStatusText(doc.status)}
                    </span>
                  </TableCell>
                  <TableCell>{doc.category || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link
                        className="hover:bg-primary/10 flex justify-center items-center h-9 px-3 rounded-md"
                        to={`/analyze/$id`}
                        params={{ id: doc.id }}
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10"
                        onClick={() => handleDownload(doc.id)}
                        disabled={downloadMutation.isPending}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10 hover:text-red-600"
                        onClick={() => handleDelete(doc.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Страница {currentPage} из {totalPages}
            </span>
            <Button
              className="border-primary text-primary hover:bg-primary/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

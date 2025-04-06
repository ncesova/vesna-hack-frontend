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
import { testDocuments } from "@/shared/testData";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { IDoc } from "./docTypes";

export default function MyDocuments() {
  const [documents, setDocuments] = useState<IDoc[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  useEffect(() => {
    setDocuments(testDocuments);
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const section = document.getElementById("section-documents");
    if (section) {
      // Добавляем небольшую задержку для надежного срабатывания
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
    // return fetch(`/api/documents/${id}`, {
    //   method: "DELETE",
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       setDocuments(documents.filter(d => d.id !== id));
    //     }
    //   })
    //   .catch(err => {
    //     console.error("Ошибка при удалении документа:", err);
    //   });
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
              <TableHead>Размер</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDocuments.map(doc => (
              <TableRow key={doc.id} className="relative">
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-center text-sm ${
                      doc.status === "Проанализировано"
                        ? "bg-primary/10 text-primary"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {doc.status}
                  </span>
                </TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link
                      className="hover:bg-primary/10 flex justify-center items-center h-9 px-3 rounded-md"
                      to={`/analyze/$id`}
                      params={{ id: doc.id }}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <a
                      className="hover:bg-primary/10 cursor-pointer flex justify-center items-center h-9 px-3 rounded-md"
                      href={doc.link}
                      download={doc.name}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10 hover:text-red-600"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

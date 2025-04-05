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
import { useEffect, useState } from "react";

interface Document {
  id: string;
  name: string;
  // type: "Техническое задание" | "Спецификация";
  uploadDate: string;
  status: "Проанализировано" | "Ожидает анализа";
  size: string;
  link: string;
}

const testDocuments: Document[] = [
  {
    id: "1",
    name: "ТЗ на разработку системы учета",
    uploadDate: "15.03.2024",
    status: "Проанализировано",
    size: "1.2 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "2",
    name: "Спецификация мобильного приложения",
    uploadDate: "02.04.2024",
    status: "Ожидает анализа",
    size: "3.5 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "3",
    name: "ТЗ на разработку CRM системы",
    uploadDate: "10.04.2024",
    status: "Ожидает анализа",
    size: "2.1 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "4",
    name: "Спецификация веб-портала",
    uploadDate: "05.04.2024",
    status: "Проанализировано",
    size: "4.7 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "5",
    name: "ТЗ на модуль аналитики",
    uploadDate: "01.04.2024",
    status: "Проанализировано",
    size: "1.8 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "6",
    name: "ТЗ на систему документооборота",
    uploadDate: "12.03.2024",
    status: "Проанализировано",
    size: "2.3 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "7",
    name: "Спецификация платежного модуля",
    uploadDate: "20.03.2024",
    status: "Ожидает анализа",
    size: "1.9 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "8",
    name: "Спецификация модуля интеграции",
    uploadDate: "15.03.2024",
    status: "Проанализировано",
    size: "2.4 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "9",
    name: "ТЗ на мобильное приложение",
    uploadDate: "18.03.2024",
    status: "Ожидает анализа",
    size: "3.1 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "10",
    name: "Спецификация API",
    uploadDate: "22.03.2024",
    status: "Проанализировано",
    size: "1.7 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "11",
    name: "ТЗ на модуль статистики",
    uploadDate: "24.03.2024",
    status: "Ожидает анализа",
    size: "2.9 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "12",
    name: "Спецификация системы уведомлений",
    uploadDate: "26.03.2024",
    status: "Проанализировано",
    size: "2.2 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "13",
    name: "ТЗ на модуль авторизации",
    uploadDate: "27.03.2024",
    status: "Ожидает анализа",
    size: "1.6 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "14",
    name: "Спецификация чат-бота",
    uploadDate: "29.03.2024",
    status: "Проанализировано",
    size: "2.5 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "15",
    name: "ТЗ на модуль отчетов",
    uploadDate: "30.03.2024",
    status: "Ожидает анализа",
    size: "3.3 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "16",
    name: "Спецификация админ-панели",
    uploadDate: "31.03.2024",
    status: "Проанализировано",
    size: "2.7 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "17",
    name: "ТЗ на модуль аналитики",
    uploadDate: "01.04.2024",
    status: "Ожидает анализа",
    size: "2.0 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "18",
    name: "Спецификация поисковой системы",
    uploadDate: "02.04.2024",
    status: "Проанализировано",
    size: "3.4 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "19",
    name: "ТЗ на модуль экспорта",
    uploadDate: "03.04.2024",
    status: "Ожидает анализа",
    size: "1.5 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "20",
    name: "Спецификация модуля импорта",
    uploadDate: "04.04.2024",
    status: "Проанализировано",
    size: "2.6 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "21",
    name: "ТЗ на систему логирования",
    uploadDate: "05.04.2024",
    status: "Ожидает анализа",
    size: "1.9 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "22",
    name: "Спецификация модуля безопасности",
    uploadDate: "06.04.2024",
    status: "Проанализировано",
    size: "3.0 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "23",
    name: "ТЗ на модуль интеграции",
    uploadDate: "07.04.2024",
    status: "Ожидает анализа",
    size: "2.3 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "24",
    name: "Спецификация модуля уведомлений",
    uploadDate: "08.04.2024",
    status: "Проанализировано",
    size: "2.8 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "25",
    name: "ТЗ на модуль статистики",
    uploadDate: "09.04.2024",
    status: "Ожидает анализа",
    size: "3.2 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "26",
    name: "Спецификация модуля отчетности",
    uploadDate: "10.04.2024",
    status: "Проанализировано",
    size: "2.1 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "27",
    name: "ТЗ на модуль аналитики",
    uploadDate: "11.04.2024",
    status: "Ожидает анализа",
    size: "2.5 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "28",
    name: "Спецификация модуля авторизации",
    uploadDate: "12.04.2024",
    status: "Проанализировано",
    size: "1.8 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "29",
    name: "ТЗ на модуль поиска",
    uploadDate: "13.04.2024",
    status: "Ожидает анализа",
    size: "2.7 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "30",
    name: "Спецификация модуля экспорта",
    uploadDate: "14.04.2024",
    status: "Проанализировано",
    size: "3.1 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "31",
    name: "ТЗ на модуль импорта",
    uploadDate: "15.04.2024",
    status: "Ожидает анализа",
    size: "2.4 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "32",
    name: "Спецификация модуля логирования",
    uploadDate: "16.04.2024",
    status: "Проанализировано",
    size: "2.0 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "33",
    name: "ТЗ на модуль безопасности",
    uploadDate: "17.04.2024",
    status: "Ожидает анализа",
    size: "2.9 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "34",
    name: "Спецификация модуля интеграции",
    uploadDate: "18.04.2024",
    status: "Проанализировано",
    size: "2.2 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "35",
    name: "ТЗ на модуль уведомлений",
    uploadDate: "19.04.2024",
    status: "Ожидает анализа",
    size: "2.6 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "36",
    name: "Спецификация модуля статистики",
    uploadDate: "20.04.2024",
    status: "Проанализировано",
    size: "3.3 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "37",
    name: "ТЗ на модуль отчетности",
    uploadDate: "21.04.2024",
    status: "Ожидает анализа",
    size: "1.7 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "38",
    name: "Спецификация модуля аналитики",
    uploadDate: "22.04.2024",
    status: "Проанализировано",
    size: "2.8 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "39",
    name: "ТЗ на модуль авторизации",
    uploadDate: "23.04.2024",
    status: "Ожидает анализа",
    size: "2.3 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "40",
    name: "Спецификация модуля поиска",
    uploadDate: "24.04.2024",
    status: "Проанализировано",
    size: "3.0 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "41",
    name: "ТЗ на модуль экспорта",
    uploadDate: "25.04.2024",
    status: "Ожидает анализа",
    size: "1.9 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "42",
    name: "Спецификация модуля импорта",
    uploadDate: "26.04.2024",
    status: "Проанализировано",
    size: "2.5 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "43",
    name: "ТЗ на модуль логирования",
    uploadDate: "27.04.2024",
    status: "Ожидает анализа",
    size: "2.1 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "44",
    name: "Спецификация модуля безопасности",
    uploadDate: "28.04.2024",
    status: "Проанализировано",
    size: "3.2 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "45",
    name: "ТЗ на модуль интеграции",
    uploadDate: "29.04.2024",
    status: "Ожидает анализа",
    size: "2.4 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "46",
    name: "Спецификация модуля уведомлений",
    uploadDate: "30.04.2024",
    status: "Проанализировано",
    size: "2.7 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "47",
    name: "ТЗ на систему мониторинга",
    uploadDate: "25.03.2024",
    status: "Проанализировано",
    size: "2.8 МБ",
    link: "/pdf-test.pdf",
  },
  {
    id: "48",
    name: "Спецификация модуля отчетности",
    uploadDate: "28.03.2024",
    status: "Ожидает анализа",
    size: "3.2 МБ",
    link: "/pdf-test.pdf",
  },
];

export default function MyDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
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
    <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4 py-8">
      {/* Хлебные крошки */}
      <Link
        to="/"
        className="inline-flex items-center text-[var(--blue)] hover:text-[var(--blue-dark)]  transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Вернуться на главную
      </Link>
      {/* Заголовок */}
      <div className="">
        <h1 className="text-2xl font-bold text-[var(--slate-dark)] mb-2">Мои документы</h1>
        <p className="text-[var(--slate)]">Просмотр и управление загруженными документами</p>
      </div>

      {/* Секция с документами */}
      <div
        id="section-documents"
        className="bg-white rounded-lg border border-[var(--slate-light)] p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-center font-semibold text-[var(--slate-dark)]">
            Загруженные документы
          </h2>
          <Input
            placeholder="Поиск документов..."
            className="max-w-xs border-[var(--slate-light)]"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название документа</TableHead>
              {/* <TableHead>Тип</TableHead> */}
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
                        ? "bg-green-50 text-green-600"
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
                      variant="ghost"
                      size="sm"
                      className="hover:bg-[var(--slate-light)] flex justify-center items-center h-9 px-3 rounded-md"
                      to={`/analyze/${doc.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <a
                      className="hover:bg-[var(--slate-light)] cursor-pointer flex justify-center items-center h-9 px-3 rounded-md"
                      href={doc.link}
                      download={doc.name}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-[var(--slate-light)] hover:text-red-600"
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
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              Страница {currentPage} из {totalPages}
            </span>
            <Button
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { knowlageBaseData } from "@/shared/testData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import type { IKnowlageBase } from "./knowlageBaseTypes";

// Определяем схему валидации
const formSchema = z.object({
  query: z.string().min(2, {
    message: "Поисковый запрос должен содержать минимум 2 символа",
  }),
});

// Тип для формы на основе схемы
type FormValues = z.infer<typeof formSchema>;

export default function KnowlageBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [knowlageBase, setKnowlageBase] = useState<IKnowlageBase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [requestSend, setRequestSend] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 15;

  const filteredDocuments = knowlageBase.filter(
    doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const section = document.getElementById("section-documents");
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-npa", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла");
      }

      // Очищаем состояние после успешной загрузки
      setFile(null);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      // Здесь логика обновления данных
      await new Promise(resolve => setTimeout(resolve, 1000));
      // const response = await fetch('/api/refresh-npa');
      // const data = await response.json();
    } catch (error) {
      console.error("Ошибка обновления:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const onSubmit = (values: FormValues) => {
    setRequestSend(true);
    // fetch("/api/search-npa", {
    //   method: "POST",
    //   body: JSON.stringify(values),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     setKnowlageBase(data);
    //   });
  };

  useEffect(() => {
    setKnowlageBase(knowlageBaseData);
    const intervalId = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <Link
        to="/"
        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Вернуться на главную
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Управление базой знаний</h1>
        <p className="text-muted-foreground">
          Управление нормативными документами и обогащение базы знаний
        </p>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          <div className="relative">
            <Button
              variant="default"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              disabled={isUploading}
            >
              <input
                type="file"
                id="file-upload"
                className="absolute opacity-0 w-full h-full m-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".doc,.docx"
                disabled={isUploading}
              />
              {file === null ? (
                <>
                  <Plus className="h-4 w-4" />
                  Добавить новый НПА
                </>
              ) : (
                <span className="max-w-[200px] truncate">{file.name}</span>
              )}
            </Button>
          </div>
          {file && (
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={handleUpload}
              disabled={isUploading}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Табы */}
      <Tabs defaultValue="view" className="mb-6">
        <TabsList className="bg-secondary p-0 h-auto flex gap-2">
          <TabsTrigger
            value="view"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-secondary rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all overflow-hidden rounded-lg"
          >
            Просмотр
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="flex-1 overflow-hidden data-[state=active]:bg-primary data-[state=active]:text-secondary rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all rounded-lg"
          >
            Добавить
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          {/* Основной контент с таблицей */}
          <div
            id="section-documents"
            className="bg-background p-6 rounded-lg border border-primary shadow-sm relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-muted-foreground hover:text-primary transition-colors"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                Нормативные документы
              </h2>
              <p className="text-muted-foreground mb-4">
                Просмотр и управление базой знаний нормативных документов
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск нормативных актов..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Название
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Последнее обновление
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Статус
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.map(doc => (
                    <tr key={doc.id} className="border-b border-primary/10 hover:bg-primary/5">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-foreground">{doc.title}</div>
                          <div className="text-sm text-muted-foreground">{doc.description}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{doc.lastUpdated}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={doc.status === "Активный" ? "default" : "secondary"}
                          className={
                            doc.status === "Активный"
                              ? "bg-green-500"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={doc.link}
                          target="_blank"
                          className="text-primary hover:bg-primary/10 px-4 py-2 rounded-md"
                        >
                          Просмотр
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
        </TabsContent>

        <TabsContent value="add">
          <div className="bg-background p-6 rounded-lg border border-primary shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Добавление нового НПА</h2>
            <p className="text-muted-foreground mb-6">
              Заполните форму для добавления нового нормативно-правового акта в базу знаний
            </p>
            <div className="flex flex-col gap-4">
              <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormItem>
                    <FormLabel>Поиск нормативных актов</FormLabel>
                    <FormControl>
                      <Input placeholder="Название/категория/номер" {...form.register("query")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <Button type="submit">Поиск</Button>
                </form>
              </Form>
            </div>
            {requestSend && (
              <div className="bg-background p-6 rounded-lg border border-primary/20 shadow-sm">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Результаты поиска
                  </h2>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <p className="text-sm">Запрос обрабатывается, пожалуйста, подождите...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

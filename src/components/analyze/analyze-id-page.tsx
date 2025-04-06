import { documentAnalysisOptions, useDownloadReport } from "@/api/Document/DocumentApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronsUpDown,
  Download,
  FileText,
  Filter,
  Info,
  Lightbulb,
  Loader2,
  X,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";

const mockTzText =
  "Пример технического задания для новой системы управления данными клиентов с аутентификацией пользователей, шифрованием данных и облачным хранилищем. Система будет обрабатывать персональные данные, включая имена, адреса и платежные реквизиты.";

// Демонстрационные данные
const mockResults = [
  {
    id: "1",
    title: "Федеральный закон № 152-ФЗ",
    description: "О персональных данных",
    relevance: 95,
    sections: ["Хранение данных", "Согласие пользователя", "Обработка данных"],
    url: "#",
  },
  {
    id: "2",
    title: "ГОСТ Р 34.10-2012",
    description:
      "Информационная технология. Криптографическая защита информации. Процессы формирования и проверки электронной цифровой подписи",
    relevance: 87,
    sections: ["Требования безопасности", "Аутентификация"],
    url: "#",
  },
  {
    id: "3",
    title: "Федеральный закон № 63-ФЗ",
    description: "Об электронной подписи",
    relevance: 82,
    sections: ["Цифровые подписи", "Аутентификация"],
    url: "#",
  },
  {
    id: "4",
    title: "Приказ ФСБ России № 378",
    description:
      "Об утверждении Положения о разработке, производстве, реализации и эксплуатации шифровальных (криптографических) средств защиты информации",
    relevance: 75,
    sections: ["Шифрование", "Требования безопасности"],
    url: "#",
  },
  {
    id: "5",
    title: "Федеральный закон № 149-ФЗ",
    description: "Об информации, информационных технологиях и о защите информации",
    relevance: 68,
    sections: ["Информационная безопасность", "Обработка данных"],
    url: "#",
  },
];

// Добавим новые демонстрационные данные для предложений по улучшению
const mockSuggestions = [
  {
    id: "1",
    regulation: 'ФЗ-152 "О персональных данных"',
    articles: "ст. 6, 18",
    requirement: "требует получения согласия пользователей на обработку персональных данных",
    status: "critical",
    action: "Добавить форму согласия на обработку персональных данных",
  },
  {
    id: "2",
    regulation: "Приказ ФСБ России № 378",
    articles: "п. 2.1, 3.4",
    requirement: "требования к алгоритмам шифрования при передаче данных",
    status: "warning",
    action: "Использовать сертифицированные средства криптографической защиты информации",
  },
  {
    id: "3",
    regulation: 'Проект ФЗ "О биометрических данных"',
    articles: "",
    requirement: "вступит в силу через 6 месяцев, регулирует сбор и обработку биометрии",
    status: "info",
    action: "Подготовить систему к соответствию новым требованиям",
  },
  {
    id: "4",
    regulation: "ГОСТ Р 34.10-2012",
    articles: "разд. 5",
    requirement: "требования к формированию и проверке электронной подписи",
    status: "success",
    action: "Текущая реализация соответствует требованиям",
  },
];

// Добавим данные для подсветки нюансов в ТЗ
const mockHighlights = [
  {
    id: "1",
    text: "персональные данные",
    explanation:
      'Упоминание обработки персональных данных требует соответствия ФЗ-152 "О персональных данных"',
    regulation: 'ФЗ-152 "О персональных данных"',
    bgColor: "#FF000033",
    borderColor: "#FF000080",
  },
  {
    id: "2",
    text: "шифрованием данных",
    explanation: "Использование шифрования требует соответствия Приказу ФСБ России № 378",
    regulation: "Приказ ФСБ России № 378",
    bgColor: "#FFA50033",
    borderColor: "#FFA50080",
  },
  {
    id: "3",
    text: "аутентификацией пользователей",
    explanation: "Механизмы аутентификации должны соответствовать ГОСТ Р 34.10-2012",
    regulation: "ГОСТ Р 34.10-2012",
    bgColor: "#0000FF33",
    borderColor: "#0000FF80",
  },
  {
    id: "4",
    text: "облачным хранилищем",
    explanation:
      'Использование облачных хранилищ регулируется ФЗ-149 "Об информации, информационных технологиях и о защите информации"',
    regulation: "Федеральный закон № 149-ФЗ",
    bgColor: "#00800033",
    borderColor: "#00800080",
  },
];

// Список всех доступных НПА для фильтрации
const availableRegulations = [
  { id: "1", title: "Федеральный закон № 152-ФЗ", description: "О персональных данных" },
  { id: "2", title: "ГОСТ Р 34.10-2012", description: "Криптографическая защита информации" },
  { id: "3", title: "Федеральный закон № 63-ФЗ", description: "Об электронной подписи" },
  { id: "4", title: "Приказ ФСБ России № 378", description: "О шифровальных средствах защиты" },
  {
    id: "5",
    title: "Федеральный закон № 149-ФЗ",
    description: "Об информации и защите информации",
  },
  { id: "6", title: "ГОСТ Р 57580", description: "Безопасность финансовых операций" },
  {
    id: "7",
    title: "Федеральный закон № 187-ФЗ",
    description: "О безопасности критической информационной инфраструктуры",
  },
  {
    id: "8",
    title: "Приказ ФСТЭК России № 21",
    description: "Об утверждении состава и содержания мер по защите информации",
  },
];

interface AnalyzePageProps {
  id: string;
}

export default function AnalyzePage({ id }: AnalyzePageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-primary font-medium">Загрузка анализа документа...</p>
            <Progress value={45} className="w-[60%] max-w-md" />
          </div>
        </div>
      }
    >
      <AnalyzePageContent id={id} />
    </Suspense>
  );
}

function AnalyzePageContent({ id }: AnalyzePageProps) {
  const { data } = useSuspenseQuery(documentAnalysisOptions(id));
  const navigate = useNavigate({ from: "/analyze" });
  if (!data || data.text === null) {
    navigate({ to: "/my-documents" });
  }
  const { downloadReportMutation } = useDownloadReport();
  //@ts-ignore
  const [showHighlights, setShowHighlights] = useState(true);
  //@ts-ignore
  const [showSuggestions, setShowSuggestions] = useState(true);
  //@ts-ignore
  const [filteredResults, setFilteredResults] = useState<typeof mockResults | null>(mockResults);
  //@ts-ignore
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  //@ts-ignore
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const mockDocumentText = mockTzText;

  const documentText = data?.text || mockDocumentText;

  const regulations = data?.npas
    ? data.npas.map((npa, index) => ({
        id: index.toString(),
        title: npa.source?.split("ПРИКАЗ")[1]
          ? "ПРИКАЗ" + npa.source?.split("ПРИКАЗ")[1]?.replace(".docx", "")
          : npa.source?.split("\\").pop()?.replace(".docx", "") || "Неизвестный документ",
        description: "",
        relevance: Math.round(npa.distancePercent),
        sections: ["Соответствие требованиям"],
        url: "#",
      }))
    : mockResults;

  // Initialize filteredResults with actual regulations data
  // This ensures we're using real data when available
  useEffect(() => {
    // Only update if we have data from API and filteredResults is still using mock data
    if (data?.npas && filteredResults === mockResults) {
      setFilteredResults(regulations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.npas]);

  const suggestions = data?.analyses || mockSuggestions;
  const highlights = data?.analyses || mockHighlights;

  // Set all highlights to use red color
  const formattedHighlights = highlights
    ? highlights.map(item => ({
        ...item,
        text: item.text || "",
        bgColor: "#FF000033", // Light red background
        borderColor: "#FF000080", // Red border
      }))
    : [];

  const filteredRegulations = searchTerm
    ? availableRegulations.filter(
        reg =>
          reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableRegulations;

  const handleFilterChange = (id: string) => {
    setSelectedRegulations(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Применение фильтров
  const applyFilters = () => {
    if (selectedRegulations.length === 0) {
      setFilteredResults(regulations);
    } else {
      setFilteredResults(
        regulations?.filter(item => selectedRegulations.includes(item.id)) || null
      );
    }
  };

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedRegulations([]);
    setFilteredResults(regulations);
  };

  // Функция для скачивания полного отчета
  const handleDownloadReport = () => {
    downloadReportMutation.mutate({ id });
  };

  // Обновленная функция рендеринга подсвеченного текста с использованием компонента Tooltip
  const renderHighlightedText = () => {
    // Исходный текст документа
    const originalText = documentText || "";

    // Создаем массив фрагментов текста и подсветок
    type TextFragment = {
      type: "text" | "highlight";
      content: string;
      highlight?: any;
    };

    let fragments: TextFragment[] = [{ type: "text", content: originalText }];

    if (formattedHighlights && formattedHighlights.length > 0) {
      // Сортируем подсветки по длине текста (от большего к меньшему)
      const sortedHighlights = [...formattedHighlights].sort(
        (a, b) => b.text.length - a.text.length
      );

      // Обрабатываем каждую подсветку
      sortedHighlights.forEach(highlight => {
        // Создаем новый массив фрагментов на основе существующего
        const newFragments: TextFragment[] = [];

        fragments.forEach(fragment => {
          if (fragment.type === "text") {
            // Проверяем, что текст для подсветки существует
            if (!highlight.text) {
              newFragments.push(fragment);
              return;
            }

            // Для case-insensitive поиска создаем регулярное выражение
            const regex = new RegExp(highlight.text, "i");
            const matches = fragment.content.match(regex);

            if (matches && matches.length > 0) {
              const parts = fragment.content.split(regex);

              // Добавляем первую часть текста
              if (parts[0]) {
                newFragments.push({ type: "text", content: parts[0] });
              }

              // Добавляем части текста и подсветки
              for (let i = 1; i < parts.length; i++) {
                // Добавляем подсветку с оригинальным текстом из документа
                newFragments.push({
                  type: "highlight",
                  content: matches[0],
                  highlight,
                });

                // Добавляем остаток текста, если он есть
                if (parts[i]) {
                  newFragments.push({ type: "text", content: parts[i] });
                }
              }
            } else {
              // Если нет вхождений, добавляем исходный фрагмент без изменений
              newFragments.push(fragment);
            }
          } else {
            // Если это уже подсветка, добавляем без изменений
            newFragments.push(fragment);
          }
        });

        // Обновляем массив фрагментов
        fragments = newFragments;
      });
    }

    return (
      <TooltipProvider delayDuration={0}>
        <div className="p-4 bg-primary/10 rounded-md min-h-[300px]">
          <p className="text-sm text-foreground">
            {fragments.map((fragment, index) => {
              if (fragment.type === "text") {
                return <span key={index}>{fragment.content}</span>;
              } else {
                const { highlight } = fragment;
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <span
                        style={{
                          backgroundColor: highlight?.bgColor || "#FF000033",
                          borderColor: highlight?.borderColor || "#FF000080",
                        }}
                        className="px-1 rounded border cursor-pointer hover:opacity-80"
                      >
                        {fragment.content}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="start"
                      className="max-w-xs z-50 bg-popover shadow-lg border border-border p-3 rounded-md"
                      sideOffset={5}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">
                          {highlight?.regulation || "Нормативный акт"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {highlight?.explanation || "Пояснение отсутствует"}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              }
            })}
          </p>
          <div className="mt-4 text-xs text-primary">
            <p>* Наведите курсор на выделенный текст, чтобы увидеть пояснение</p>
          </div>
        </div>
      </TooltipProvider>
    );
  };

  // Replace the filter button and filter panel with dropdown menu
  const filterButton = (
    <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary/10 flex gap-2 items-center"
        >
          <Filter className="h-4 w-4" />
          Фильтр НПА
          {selectedRegulations.length > 0 && (
            <Badge className="ml-1 bg-primary hover:bg-primary/90">
              {selectedRegulations.length}
            </Badge>
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[340px] p-0" align="start">
        <Command className="border-0">
          <CommandInput
            placeholder="Поиск нормативных актов..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="border-0 focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>Нормативных актов не найдено.</CommandEmpty>
            <CommandGroup>
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <CommandItem
                    className="px-2 cursor-pointer"
                    onSelect={() => {
                      if (selectedRegulations.length === filteredRegulations.length) {
                        setSelectedRegulations([]);
                      } else {
                        setSelectedRegulations(filteredRegulations.map(r => r.id));
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          id="select-all"
                          checked={
                            filteredRegulations.length > 0 &&
                            selectedRegulations.length === filteredRegulations.length
                          }
                          className="h-5 w-5 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor="select-all" className="font-medium">
                          Выбрать все
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded">
                        Ctrl+A
                      </span>
                    </div>
                  </CommandItem>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-8 px-2 text-sm text-primary"
                  >
                    Сбросить
                  </Button>
                </div>
              </div>

              <CommandSeparator />

              <ScrollArea className="h-[300px]">
                {filteredRegulations.map(regulation => (
                  <CommandItem
                    key={regulation.id}
                    onSelect={() => handleFilterChange(regulation.id)}
                    className="px-2 py-1 cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 w-full">
                      <Checkbox
                        id={`regulation-${regulation.id}`}
                        checked={selectedRegulations.includes(regulation.id)}
                        className="mt-1 h-5 w-5 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={`regulation-${regulation.id}`}
                          className="text-sm font-medium text-foreground"
                        >
                          {regulation.title}
                        </Label>
                        <p className="text-xs text-primary">{regulation.description}</p>
                      </div>
                      {selectedRegulations.includes(regulation.id) && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>

          <div className="flex items-center justify-between gap-2 p-2 border-t">
            <div className="text-xs text-muted-foreground">
              <kbd className="px-1 bg-muted rounded">↑</kbd>{" "}
              <kbd className="px-1 bg-muted rounded">↓</kbd> для навигации,
              <kbd className="ml-1 px-1 bg-muted rounded">Enter</kbd> для выбора
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                applyFilters();
                setIsFilterOpen(false);
              }}
            >
              Применить
            </Button>
          </div>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/my-documents"
        className="flex items-center text-sm mb-6 hover:underline text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Вернуться ко всем документам
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-primary shadow-md">
            <CardHeader className="bg-primary/10 py-2 rounded-t-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-foreground">Техническое задание</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Ваш загруженный документ или вставленный текст
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {!showHighlights ? (
                <div className="p-4 bg-primary/10 rounded-md min-h-[300px]">
                  <p className="text-sm text-foreground">
                    {/* Здесь будет отображаться содержимое документа */}
                    {documentText}
                  </p>
                </div>
              ) : (
                renderHighlightedText()
              )}

              <div className="flex justify-between">{filterButton}</div>
            </CardContent>
          </Card>

          {/* {showSummary && (
            <Card className="border-primary shadow-md mt-6">
              <CardHeader className="bg-primary/10 py-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Краткое резюме</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-foreground text-sm">
                  Техническое задание описывает систему управления данными клиентов с функциями
                  аутентификации и шифрования. Основные аспекты, требующие соответствия нормативным
                  актам:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-foreground list-disc pl-5">
                  <li>Обработка персональных данных клиентов</li>
                  <li>Хранение конфиденциальной информации</li>
                  <li>Требования к системам аутентификации</li>
                  <li>Шифрование данных при передаче и хранении</li>
                  <li>Соответствие требованиям облачного хранения</li>
                </ul>
              </CardContent>
            </Card>
          )} */}
        </div>

        <div className="lg:col-span-2">
          {filteredResults && (
            <Card className="border-primary shadow-md">
              <CardHeader className="bg-primary/10 py-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Результаты анализа</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Нормативные документы, относящиеся к вашему техническому заданию
                </CardDescription>

                {selectedRegulations.length > 0 && (
                  <div className="mt-3">
                    <Separator className="mb-2 bg-primary/10" />
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs text-primary">Активные фильтры:</span>
                      {selectedRegulations.map(regId => {
                        const regulation = availableRegulations.find(r => r.id === regId);
                        if (!regulation) return null;

                        return (
                          <Badge
                            key={regId}
                            variant="outline"
                            className="bg-primary/10 border-primary text-primary flex items-center gap-1 pl-2 pr-1"
                          >
                            {regulation.title}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0 hover:bg-primary/20 rounded-full"
                              onClick={() => handleFilterChange(regId)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </Badge>
                        );
                      })}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-primary hover:bg-primary/20"
                        onClick={resetFilters}
                      >
                        Сбросить все
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="relevant" className="w-full">
                  <TabsList className="mb-4 bg-primary/10">
                    <TabsTrigger
                      value="relevant"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      Релевантные НПА
                    </TabsTrigger>
                    <TabsTrigger
                      value="sections"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      По разделам
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="relevant" className="space-y-4">
                    {filteredResults.length > 0 ? (
                      filteredResults.map(regulation => (
                        <div
                          key={regulation.id}
                          className="border border-primary rounded-lg p-4 space-y-3 hover:bg-primary/10"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-primary">{regulation.title}</h3>
                              <p className="text-sm text-primary">{regulation.description}</p>
                            </div>
                            <Badge
                              variant={
                                regulation.relevance > 90
                                  ? "destructive"
                                  : regulation.relevance > 80
                                    ? "default"
                                    : "outline"
                              }
                              className={
                                regulation.relevance > 90
                                  ? "bg-destructive"
                                  : regulation.relevance > 80
                                    ? "bg-primary"
                                    : "border-primary text-primary bg-primary/10"
                              }
                            >
                              {regulation.relevance}% Совпадение
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {regulation.sections.map(section => (
                              <Badge
                                key={section}
                                variant="secondary"
                                className="bg-primary text-secondary"
                              >
                                {section}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex justify-end gap-2">
                            <Link
                              to={regulation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:text-primary hover:underline flex items-center"
                            >
                              <FileText className="mr-1.5 h-4 w-4" />
                              Перейти к документу
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Info className="mx-auto h-12 w-12 text-primary opacity-50" />
                        <h3 className="mt-4 text-lg font-medium text-primary">Нет результатов</h3>
                        <p className="mt-2 text-sm text-primary">
                          По выбранным фильтрам не найдено нормативных актов. Попробуйте изменить
                          параметры фильтрации.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="sections">
                    <div className="space-y-6">
                      {filteredResults.length > 0 ? (
                        Array.from(new Set(filteredResults.flatMap(r => r.sections))).map(
                          section => (
                            <div key={section} className="space-y-3">
                              <h3 className="font-medium text-lg text-primary border-b border-primary/10 pb-2">
                                {section}
                              </h3>
                              <div className="space-y-3">
                                {filteredResults
                                  .filter(r => r.sections.includes(section))
                                  .map(regulation => (
                                    <div
                                      key={regulation.id}
                                      className="border border-primary rounded-lg p-3 flex justify-between items-center hover:bg-primary/10"
                                    >
                                      <div>
                                        <h4 className="font-medium text-primary">
                                          {regulation.title}
                                        </h4>
                                        <p className="text-sm text-primary">
                                          {regulation.description}
                                        </p>
                                        <Link
                                          to={regulation.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-primary hover:text-primary hover:underline flex items-center mt-1"
                                        >
                                          <FileText className="mr-1 h-3 w-3" />
                                          Перейти к документу
                                        </Link>
                                      </div>
                                      <Badge
                                        variant={
                                          regulation.relevance > 90
                                            ? "destructive"
                                            : regulation.relevance > 80
                                              ? "default"
                                              : "outline"
                                        }
                                        className={
                                          regulation.relevance > 90
                                            ? "bg-destructive"
                                            : regulation.relevance > 80
                                              ? "bg-primary"
                                              : "border-primary text-primary bg-primary/10"
                                        }
                                      >
                                        {regulation.relevance}% Совпадение
                                      </Badge>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="text-center py-8">
                          <Info className="mx-auto h-12 w-12 text-primary opacity-50" />
                          <h3 className="mt-4 text-lg font-medium text-primary">Нет результатов</h3>
                          <p className="mt-2 text-sm text-primary">
                            По выбранным фильтрам не найдено нормативных актов. Попробуйте изменить
                            параметры фильтрации.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-primary hover:bg-primary"
                    onClick={handleDownloadReport}
                    disabled={downloadReportMutation.isPending}
                  >
                    {downloadReportMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Экспорт полного отчета
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {suggestions && suggestions.length > 0 && showSuggestions && (
            <Card className="border-primary shadow-md mt-6">
              <CardHeader className="bg-primary/10 py-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Предложения по улучшению</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Рекомендации по доработке технического задания для соответствия нормативным
                  требованиям
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {suggestions.map(suggestion => {
                  // Determine if this is from the API or mock data
                  const isApiData = "text" in suggestion && "explanation" in suggestion;

                  return (
                    <div
                      key={suggestion.id || ""}
                      className="border border-primary rounded-lg p-4 space-y-2 hover:bg-primary/10"
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle
                          style={{ color: "#FF0000" }}
                          className="h-5 w-5 mt-0.5 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground">
                              {suggestion.regulation || ""}
                            </h3>
                          </div>
                          <p className="text-sm text-foreground">
                            →{" "}
                            {isApiData
                              ? suggestion.explanation
                              : (suggestion as any).requirement || ""}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge
                              style={{
                                backgroundColor: "#FFEBEE",
                                color: "#B71C1C",
                                borderColor: "#FFCDD2",
                              }}
                              className="text-xs py-1 font-medium border px-2 rounded"
                            >
                              Важно
                            </Badge>
                            <span className="text-sm font-medium text-foreground">Текст:</span>
                            <span className="text-sm text-foreground">
                              {isApiData ? suggestion.text : (suggestion as any).action || ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {!filteredResults && !isFilterOpen && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <p className="text-primary">Результаты анализа документа недоступны</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useDownloadReport } from "@/api/Analyze/AnalyzeApi";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle,
  ChevronsUpDown,
  Clock,
  Download,
  FileText,
  Filter,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";

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
    color: "bg-red-100 border-red-300",
  },
  {
    id: "2",
    text: "шифрованием данных",
    explanation: "Использование шифрования требует соответствия Приказу ФСБ России № 378",
    regulation: "Приказ ФСБ России № 378",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: "3",
    text: "аутентификацией пользователей",
    explanation: "Механизмы аутентификации должны соответствовать ГОСТ Р 34.10-2012",
    regulation: "ГОСТ Р 34.10-2012",
    color: "bg-green-100 border-green-300",
  },
  {
    id: "4",
    text: "облачным хранилищем",
    explanation:
      'Использование облачных хранилищ регулируется ФЗ-149 "Об информации, информационных технологиях и о защите информации"',
    regulation: "Федеральный закон № 149-ФЗ",
    color: "bg-blue-100 border-blue-300",
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
  // Comment out unused variables for now - will be used when API integration is complete
  // const { data, isLoading } = useQuery(analyzeResultOptions(id));
  // const { analyzeMutation } = useAnalyze();
  const { downloadReportMutation } = useDownloadReport();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [filteredResults, setFilteredResults] = useState<typeof mockResults | null>(null);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Отфильтрованные регуляции по поисковому запросу
  const filteredRegulations = searchTerm
    ? availableRegulations.filter(
        reg =>
          reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableRegulations;

  // Имитация процесса анализа
  const startAnalysis = () => {
    setIsAnalyzing(true);

    // Здесь будет вызов API для анализа
    // Например:
    // analyzeMutation.mutate({
    //   userId: "user123",
    //   files: formData
    // });

    // Временная имитация
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowSummary(true);
      setShowSuggestions(true);
      setShowHighlights(true);
      setFilteredResults(mockResults);
    }, 3000);
  };

  // Обработка фильтрации НПА
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
      setFilteredResults(mockResults);
    } else {
      setFilteredResults(
        mockResults?.filter(item => selectedRegulations.includes(item.id)) || null
      );
    }
  };

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedRegulations([]);
    setFilteredResults(mockResults);
  };

  // Функция для скачивания полного отчета
  const handleDownloadReport = () => {
    downloadReportMutation.mutate({ id });
  };

  // Функция для подсветки текста
  const highlightText = (text: string) => {
    let highlightedText = text;

    // Сортируем подсветки по длине текста (от большего к меньшему),
    // чтобы избежать проблем с вложенными подсветками
    const sortedHighlights = [...mockHighlights].sort((a, b) => b.text.length - a.text.length);

    for (const highlight of sortedHighlights) {
      const parts = highlightedText.split(highlight.text);
      highlightedText = parts.join(
        `<span class="px-1 rounded border ${highlight.color} cursor-pointer hover:opacity-80" 
               data-tooltip="${highlight.explanation}" 
               data-regulation="${highlight.regulation}">
          ${highlight.text}
        </span>`
      );
    }

    return highlightedText;
  };

  // Replace the filter button and filter panel with dropdown menu
  const filterButton = (
    <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-green-600 text-green-700 hover:bg-green-100 flex gap-2 items-center"
        >
          <Filter className="h-4 w-4" />
          Фильтр НПА
          {selectedRegulations.length > 0 && (
            <Badge className="ml-1 bg-green-600 hover:bg-green-700">
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
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="select-all"
                          checked={
                            filteredRegulations.length > 0 &&
                            selectedRegulations.length === filteredRegulations.length
                          }
                          className="border-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                        <Label htmlFor="select-all" className="font-medium">
                          Выбрать все
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Ctrl+A</span>
                    </div>
                  </CommandItem>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-8 px-2 text-sm text-green-700"
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
                    <div className="flex items-start space-x-2 w-full">
                      <Checkbox
                        id={`regulation-${regulation.id}`}
                        checked={selectedRegulations.includes(regulation.id)}
                        className="mt-1 border-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={`regulation-${regulation.id}`}
                          className="text-sm font-medium text-green-800"
                        >
                          {regulation.title}
                        </Label>
                        <p className="text-xs text-green-700">{regulation.description}</p>
                      </div>
                      {selectedRegulations.includes(regulation.id) && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>

          <div className="flex items-center justify-between gap-2 p-2 border-t">
            <div className="text-xs text-muted-foreground text-green-600">
              <kbd className="px-1 bg-green-100 rounded">↑</kbd>{" "}
              <kbd className="px-1 bg-green-100 rounded">↓</kbd> для навигации,
              <kbd className="ml-1 px-1 bg-green-100 rounded">Enter</kbd> для выбора
            </div>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
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
      <Link to="/" className="flex items-center text-sm mb-6 hover:underline text-green-700">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Вернуться на главную
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-green-200 shadow-md">
            <CardHeader className="bg-green-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-800">Техническое задание</CardTitle>
              </div>
              <CardDescription className="text-green-700">
                Ваш загруженный документ или вставленный текст
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {!showHighlights ? (
                <div className="p-4 bg-green-50 rounded-md min-h-[300px]">
                  <p className="text-sm text-green-700">
                    {/* Здесь будет отображаться содержимое документа */}
                    Пример технического задания для новой системы управления данными клиентов с
                    аутентификацией пользователей, шифрованием данных и облачным хранилищем. Система
                    будет обрабатывать персональные данные, включая имена, адреса и платежные
                    реквизиты.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-md min-h-[300px]">
                  <p
                    className="text-sm text-green-700"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        "Пример технического задания для новой системы управления данными клиентов с аутентификацией пользователей, шифрованием данных и облачным хранилищем. Система будет обрабатывать персональные данные, включая имена, адреса и платежные реквизиты."
                      ),
                    }}
                  />
                  <div className="mt-4 text-xs text-green-600">
                    <p>* Наведите курсор на выделенный текст, чтобы увидеть пояснение</p>
                  </div>
                </div>
              )}

              {!isAnalyzing && !showSummary && (
                <Button onClick={startAnalysis} className="w-full bg-green-600 hover:bg-green-700">
                  Начать анализ
                </Button>
              )}

              {isAnalyzing && (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <span className="ml-2 text-green-700">Анализ документа...</span>
                </div>
              )}

              {showSummary && <div className="flex justify-between">{filterButton}</div>}
            </CardContent>
          </Card>

          {showSummary && (
            <Card className="border-green-200 shadow-md mt-6">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-800">Краткое резюме</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-green-700 text-sm">
                  Техническое задание описывает систему управления данными клиентов с функциями
                  аутентификации и шифрования. Основные аспекты, требующие соответствия нормативным
                  актам:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-green-700 list-disc pl-5">
                  <li>Обработка персональных данных клиентов</li>
                  <li>Хранение конфиденциальной информации</li>
                  <li>Требования к системам аутентификации</li>
                  <li>Шифрование данных при передаче и хранении</li>
                  <li>Соответствие требованиям облачного хранения</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          {filteredResults && (
            <Card className="border-green-200 shadow-md">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-800">Результаты анализа</CardTitle>
                </div>
                <CardDescription className="text-green-700">
                  Нормативные документы, относящиеся к вашему техническому заданию
                </CardDescription>

                {selectedRegulations.length > 0 && (
                  <div className="mt-3">
                    <Separator className="mb-2 bg-green-100" />
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs text-green-700">Активные фильтры:</span>
                      {selectedRegulations.map(regId => {
                        const regulation = availableRegulations.find(r => r.id === regId);
                        if (!regulation) return null;

                        return (
                          <Badge
                            key={regId}
                            variant="outline"
                            className="bg-green-50 border-green-200 text-green-800 flex items-center gap-1 pl-2 pr-1"
                          >
                            {regulation.title}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0 hover:bg-green-100 rounded-full"
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
                        className="h-7 px-2 text-xs text-green-700 hover:bg-green-100"
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
                  <TabsList className="mb-4 bg-green-100">
                    <TabsTrigger
                      value="relevant"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Релевантные НПА
                    </TabsTrigger>
                    <TabsTrigger
                      value="sections"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      По разделам
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="relevant" className="space-y-4">
                    {filteredResults.length > 0 ? (
                      filteredResults.map(regulation => (
                        <div
                          key={regulation.id}
                          className="border border-green-200 rounded-lg p-4 space-y-3 hover:bg-green-50"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-green-800">{regulation.title}</h3>
                              <p className="text-sm text-green-700">{regulation.description}</p>
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
                                  ? "bg-red-500"
                                  : regulation.relevance > 80
                                    ? "bg-green-600"
                                    : "border-green-500 text-green-700 bg-green-50"
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
                                className="bg-green-100 text-green-800"
                              >
                                {section}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Download className="mr-2 h-4 w-4" />
                              Скачать документ
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Info className="mx-auto h-12 w-12 text-green-400 opacity-50" />
                        <h3 className="mt-4 text-lg font-medium text-green-800">Нет результатов</h3>
                        <p className="mt-2 text-sm text-green-600">
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
                              <h3 className="font-medium text-lg text-green-800 border-b border-green-200 pb-2">
                                {section}
                              </h3>
                              <div className="space-y-3">
                                {filteredResults
                                  .filter(r => r.sections.includes(section))
                                  .map(regulation => (
                                    <div
                                      key={regulation.id}
                                      className="border border-green-200 rounded-lg p-3 flex justify-between items-center hover:bg-green-50"
                                    >
                                      <div>
                                        <h4 className="font-medium text-green-800">
                                          {regulation.title}
                                        </h4>
                                        <p className="text-sm text-green-700">
                                          {regulation.description}
                                        </p>
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
                                            ? "bg-red-500"
                                            : regulation.relevance > 80
                                              ? "bg-green-600"
                                              : "border-green-500 text-green-700 bg-green-50"
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
                          <Info className="mx-auto h-12 w-12 text-green-400 opacity-50" />
                          <h3 className="mt-4 text-lg font-medium text-green-800">
                            Нет результатов
                          </h3>
                          <p className="mt-2 text-sm text-green-600">
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
                    className="bg-green-600 hover:bg-green-700"
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

          {showSuggestions && (
            <Card className="border-green-200 shadow-md mt-6">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-800">Предложения по улучшению</CardTitle>
                </div>
                <CardDescription className="text-green-700">
                  Рекомендации по доработке технического задания для соответствия нормативным
                  требованиям
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {mockSuggestions.map(suggestion => (
                  <div
                    key={suggestion.id}
                    className="border border-green-200 rounded-lg p-4 space-y-2 hover:bg-green-50"
                  >
                    <div className="flex items-start gap-2">
                      {suggestion.status === "critical" && (
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                      )}
                      {suggestion.status === "warning" && (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                      )}
                      {suggestion.status === "info" && (
                        <Clock className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                      )}
                      {suggestion.status === "success" && (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-green-800">{suggestion.regulation}</h3>
                          {suggestion.articles && (
                            <span className="text-sm text-green-700">({suggestion.articles})</span>
                          )}
                        </div>
                        <p className="text-sm text-green-700">→ {suggestion.requirement}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            className={
                              suggestion.status === "critical"
                                ? "bg-red-100 text-red-800 border-red-300"
                                : suggestion.status === "warning"
                                  ? "bg-amber-100 text-amber-800 border-amber-300"
                                  : suggestion.status === "info"
                                    ? "bg-blue-100 text-blue-800 border-blue-300"
                                    : "bg-green-100 text-green-800 border-green-300"
                            }
                          >
                            {suggestion.status === "critical" && "Критично"}
                            {suggestion.status === "warning" && "Требует внимания"}
                            {suggestion.status === "info" && "Информация"}
                            {suggestion.status === "success" && "Соответствует"}
                          </Badge>
                          <span className="text-sm font-medium text-green-800">Рекомендация:</span>
                          <span className="text-sm text-green-700">{suggestion.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {!filteredResults && !isAnalyzing && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <p className="text-green-700">
                  Загрузите документ и начните анализ, чтобы увидеть результаты
                </p>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8 flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
                <p className="text-green-700">Анализ вашего документа...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

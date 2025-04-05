import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Filter,
  Info,
  MessageSquare,
  Send,
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

// Добавим данные для диалога
const mockDialogue = [
  {
    id: "1",
    sender: "system",
    message:
      "Здравствуйте! Я помогу вам уточнить детали вашего технического задания для обеспечения соответствия нормативным требованиям. Какие аспекты вы хотели бы обсудить?",
  },
  {
    id: "2",
    sender: "user",
    message:
      "Меня интересует, какие требования предъявляются к хранению персональных данных клиентов?",
  },
  {
    id: "3",
    sender: "system",
    message:
      'Согласно ФЗ-152 "О персональных данных", вам необходимо:\n\n1. Получить согласие пользователей на обработку их персональных данных\n2. Обеспечить защиту данных от несанкционированного доступа\n3. Хранить данные на территории РФ\n4. Предоставить пользователям возможность удаления их данных\n\nХотите, чтобы я добавил эти требования в ваше ТЗ?',
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
  // const { data } = useQuery(analyzeResultOptions(id));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<typeof mockResults | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [filteredResults, setFilteredResults] = useState<typeof mockResults | null>(null);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [dialogue, setDialogue] = useState(mockDialogue);

  // Имитация процесса анализа
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setResults(null);
    setFilteredResults(null);
    setShowSummary(false);
    setShowSuggestions(false);
    setShowHighlights(false);
    setSelectedRegulations([]);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setResults(mockResults);
          setFilteredResults(mockResults);
          setShowSummary(true);
          setShowSuggestions(true);
          setShowHighlights(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
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
      setFilteredResults(results);
    } else {
      setFilteredResults(results?.filter(item => selectedRegulations.includes(item.id)) || null);
    }
    setShowFilterPanel(false);
  };

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedRegulations([]);
    setFilteredResults(results);
    setShowFilterPanel(false);
  };

  // Обработка отправки сообщения в диалоге
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage = {
      id: (dialogue.length + 1).toString(),
      sender: "user",
      message: newMessage,
    };

    setDialogue(prev => [...prev, userMessage]);
    setNewMessage("");

    // Имитация ответа системы
    setTimeout(() => {
      const systemMessage = {
        id: (dialogue.length + 2).toString(),
        sender: "system",
        message:
          "Спасибо за ваш вопрос! Я добавил соответствующие требования в ваше техническое задание. Хотите обсудить другие аспекты?",
      };
      setDialogue(prev => [...prev, systemMessage]);
    }, 1000);
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

              {!isAnalyzing && !results && (
                <Button onClick={startAnalysis} className="w-full bg-green-600 hover:bg-green-700">
                  Начать анализ
                </Button>
              )}

              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full bg-green-100" />
                  <p className="text-xs text-center text-green-700">
                    Анализ документа и сопоставление с нормативными требованиями...
                  </p>
                </div>
              )}

              {results && (
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-700 hover:bg-green-100"
                    onClick={() => setShowDialogue(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Режим диалога
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-700 hover:bg-green-100"
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Фильтр НПА
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {showSummary && (
            <Card className="border-green-200 shadow-md mt-6">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
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

          {showFilterPanel && (
            <Card className="border-green-200 shadow-md mt-6">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-800">Фильтр НПА</CardTitle>
                </div>
                <CardDescription className="text-green-700">
                  Выберите нормативные акты для проверки
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {availableRegulations.map(regulation => (
                    <div key={regulation.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`regulation-${regulation.id}`}
                        checked={selectedRegulations.includes(regulation.id)}
                        onCheckedChange={() => handleFilterChange(regulation.id)}
                        className="mt-1 border-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div>
                        <Label
                          htmlFor={`regulation-${regulation.id}`}
                          className="text-sm font-medium text-green-800"
                        >
                          {regulation.title}
                        </Label>
                        <p className="text-xs text-green-700">{regulation.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-700 hover:bg-green-100"
                    onClick={resetFilters}
                  >
                    Сбросить
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={applyFilters}
                  >
                    Применить
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          {showDialogue ? (
            <Card className="border-green-200 shadow-md h-full">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-green-800">Режим диалога</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-700 hover:bg-green-100"
                    onClick={() => setShowDialogue(false)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Вернуться к анализу
                  </Button>
                </div>
                <CardDescription className="text-green-700">
                  Уточните детали вашего технического задания в режиме диалога
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex flex-col h-[calc(100%-140px)]">
                <ScrollArea className="flex-grow mb-4 pr-4">
                  <div className="space-y-4">
                    {dialogue.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-green-600 text-white"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2 mt-auto">
                  <Input
                    placeholder="Введите ваш вопрос..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                    className="border-green-300 focus-visible:ring-green-500"
                  />
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Download className="mr-2 h-4 w-4" />
                    Экспорт готового документа
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {filteredResults && (
                <Card className="border-green-200 shadow-md">
                  <CardHeader className="bg-green-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-green-800">Результаты анализа</CardTitle>
                    </div>
                    <CardDescription className="text-green-700">
                      Нормативные документы, относящиеся к вашему техническому заданию
                      {selectedRegulations.length > 0 &&
                        ` (отфильтровано: ${selectedRegulations.length})`}
                    </CardDescription>
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
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-green-600 text-green-700 hover:bg-green-100"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Сохранить
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Консультация
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <Info className="mx-auto h-12 w-12 text-green-400 opacity-50" />
                            <h3 className="mt-4 text-lg font-medium text-green-800">
                              Нет результатов
                            </h3>
                            <p className="mt-2 text-sm text-green-600">
                              По выбранным фильтрам не найдено нормативных актов. Попробуйте
                              изменить параметры фильтрации.
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
                                По выбранным фильтрам не найдено нормативных актов. Попробуйте
                                изменить параметры фильтрации.
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Download className="mr-2 h-4 w-4" />
                        Экспорт полного отчета
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {results && showSuggestions && (
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
                              <h3 className="font-medium text-green-800">
                                {suggestion.regulation}
                              </h3>
                              {suggestion.articles && (
                                <span className="text-sm text-green-700">
                                  ({suggestion.articles})
                                </span>
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
                              <span className="text-sm font-medium text-green-800">
                                Рекомендация:
                              </span>
                              <span className="text-sm text-green-700">{suggestion.action}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-700 hover:bg-green-100"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Получить консультацию
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Download className="mr-2 h-4 w-4" />
                        Скачать рекомендации
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!results && !isAnalyzing && (
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
                  <div className="text-center p-8">
                    <p className="text-green-700">Анализ вашего документа...</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

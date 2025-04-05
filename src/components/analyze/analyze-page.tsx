import { userAuthOptions } from "@/api/UserAuth/UserAuthApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUpload } from "@/components/analyze/file-upload";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { BookOpen, FileText } from "lucide-react";

export default function Home() {
  const { data } = useQuery(userAuthOptions());
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Система проверки технических заданий
          </h1>
          <p className="text-xl text-primary/80 max-w-2xl">
            Анализ технических заданий на соответствие нормативно-правовым актам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-secondary rounded-t-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="text-primary">Анализ технического задания</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Загрузите или вставьте текст технического задания для поиска соответствующих
                нормативных требований
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <FileUpload />
            </CardContent>
          </Card>

          <Card className="border-border shadow-md">
            <CardHeader className="bg-secondary rounded-t-lg">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="text-primary">Управление базой знаний</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Для экспертов по НПА: поддержка и обогащение базы знаний нормативных документов
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-primary">Доступные инструменты:</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Добавление новых нормативных документов</li>
                <li>Обновление существующих регламентов</li>
                <li>Управление классификацией документов</li>
                <li>Проверка точности анализа</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/acts" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-secondary"
                >
                  Доступ к базе знаний
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

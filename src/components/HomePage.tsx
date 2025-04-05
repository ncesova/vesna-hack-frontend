import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero секция */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Система проверки технических заданий
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Автоматизированный анализ технических заданий на соответствие нормативным требованиям и
          лучшим практикам
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/analyze">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Начать анализ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/knowledge-base">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              База знаний
              <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Преимущества */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 rounded-lg border border-primary shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Быстрый анализ</h3>
          </div>
          <p className="text-muted-foreground">
            Мгновенная проверка ТЗ на соответствие нормативным требованиям и выявление потенциальных
            рисков
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-primary shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Нормативное соответствие</h3>
          </div>
          <p className="text-muted-foreground">
            Автоматическая проверка соответствия требованиям ФЗ-152, ГОСТов и других нормативных
            документов
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-primary shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Детальные отчеты</h3>
          </div>
          <p className="text-muted-foreground">
            Подробные отчеты с рекомендациями по улучшению и ссылками на нормативные документы
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-primary shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">База знаний</h3>
          </div>
          <p className="text-muted-foreground">
            Доступ к актуальной базе нормативных документов и лучших практик разработки ТЗ
          </p>
        </div>
      </section>

      {/* Как это работает */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">Как это работает</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Загрузите ТЗ</h3>
            <p className="text-muted-foreground">
              Загрузите техническое задание в формате PDF или DOCX
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Анализ документа</h3>
            <p className="text-muted-foreground">
              Система автоматически анализирует документ на соответствие требованиям
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Получите отчет</h3>
            <p className="text-muted-foreground">
              Скачайте детальный отчет с рекомендациями и ссылками на нормативные документы
            </p>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Готовы начать?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Загрузите свое техническое задание прямо сейчас и получите мгновенный анализ на
          соответствие нормативным требованиям
        </p>
        <Link to="/analyze">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Начать анализ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

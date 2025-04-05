import type React from "react";

import { useAnalyze } from "@/api/Analyze/AnalyzeApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function FileUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { analyzeMutation } = useAnalyze();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);

      // For preview purposes only (optional)
      if (selectedFile.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target?.result) {
            setTextContent(event.target.result as string);
          }
        };
        reader.readAsText(selectedFile);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();

      // If a file was selected, add it to the FormData
      if (file) {
        formData.append("file", file);
      }
      // If text was entered, create a text file and add it
      else if (textContent) {
        const textFile = new File([textContent], "text-input.txt", { type: "text/plain" });
        formData.append("file", textFile);
      } else {
        toast.error("Пожалуйста, загрузите файл или введите текст");
        setIsUploading(false);
        return;
      }

      // Add any other required fields - assuming there's a logged-in user
      // You may need to adjust this based on your application's auth state
      const userId = "1"; // Replace with actual user ID from your auth context

      // Call the API to analyze the content
      await analyzeMutation.mutateAsync({
        userId,
        files: formData,
      });

      toast.success("Документ принят на обработку");

      // Optionally reset the form
      // setFile(null);
      // setFileName(null);
      // setTextContent("");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Не удалось загрузить документ. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4 bg-secondary">
        <TabsTrigger
          value="upload"
          className="data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Загрузить документ
        </TabsTrigger>
        <TabsTrigger
          value="paste"
          className="data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Вставить текст
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center gap-4 bg-secondary">
          <Upload className="h-10 w-10 text-primary" />
          <div className="text-center">
            <p className="text-sm font-medium text-primary">
              {fileName ? fileName : "Перетащите документ сюда"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Поддерживаются форматы DOCX, PDF и TXT до 10МБ
            </p>
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".docx,.pdf,.txt"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            className="border-primary text-primary hover:bg-secondary"
          >
            Выбрать файл
          </Button>
        </div>
        {fileName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{fileName}</span>
          </div>
        )}
      </TabsContent>

      <TabsContent value="paste" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="specification-text" className="text-primary">
            Вставьте текст технического задания
          </Label>
          <Textarea
            id="specification-text"
            placeholder="Введите текст технического задания здесь..."
            className="min-h-[200px] border-border focus-visible:ring-primary"
            value={textContent}
            onChange={e => setTextContent(e.target.value)}
          />
        </div>
      </TabsContent>

      <div className="mt-6">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleSubmit}
          disabled={isUploading || (!file && !textContent)}
        >
          {isUploading ? "Загрузка..." : "Анализировать документ"}
        </Button>
      </div>
    </Tabs>
  );
}

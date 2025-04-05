"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthTabs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      <div className="w-full max-w-[400px] relative top-10 p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-200">
          <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Добро пожаловать
          </h1>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="flex justify-center gap-2 w-full grid-cols-2 mb-6 bg-slate-50 p-1 border border-slate-200">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300 ease-in-out text-slate-600 hover:bg-slate-100 data-[state=active]:shadow-sm"
              >
                Вход
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300 ease-in-out text-slate-600 hover:bg-slate-100 data-[state=active]:shadow-sm"
              >
                Регистрация
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="animate-fade-in">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup" className="animate-slide-in">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

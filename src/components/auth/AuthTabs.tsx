"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthTabs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-[400px] relative top-10 p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Добро пожаловать</h1>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="flex justify-center gap-2 w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300 ease-in-out bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                Вход
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300 ease-in-out bg-gray-100 text-gray-600 hover:bg-gray-200"
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

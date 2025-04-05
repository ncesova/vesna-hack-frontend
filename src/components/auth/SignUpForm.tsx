"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
    email: z.string().email({ message: "Некорректный email" }),
    password: z
      .string()
      .min(8, { message: "Пароль должен содержать минимум 8 символов" })
      .max(50, { message: "Пароль не может быть длиннее 50 символов" }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    fetch("api/auth/signup", {})
      .then(res => {
        if (res.ok) {
        }
      })
      .catch()
      .finally();
  }

  interface FormControl {
    label: string;
    name: "name" | "password" | "email" | "confirmPassword";
    placeholder: string;
    type?: string;
  }

  const formControls: FormControl[] = [
    {
      label: "Имя",
      name: "name",
      placeholder: "Введите имя",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Введите email",
      type: "email",
    },
    {
      label: "Пароль",
      name: "password",
      placeholder: "Введите пароль",
      type: "password",
    },
    {
      label: "Подтвердите пароль",
      name: "confirmPassword",
      placeholder: "Повторите пароль",
      type: "password",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {formControls.map((control: FormControl, i: number) => (
          <FormField
            key={i}
            control={form.control}
            name={control.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">{control.label}</FormLabel>
                <FormControl>
                  <Input
                    type={control.type}
                    placeholder={control.placeholder}
                    {...field}
                    className="border-slate-200 focus-visible:ring-blue-500 bg-slate-50 placeholder:text-slate-400"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-6 text-lg transition-all duration-300"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}

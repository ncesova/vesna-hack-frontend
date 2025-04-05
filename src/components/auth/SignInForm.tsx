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

const formSchema = z.object({
  email: z.string().email({ message: "Некорректный email " }),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать минимум 8 символов" })
    .max(50, { message: "Пароль не может быть длиннее 50 символов" }),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  interface FormControl {
    label: string;
    name: "password" | "email";
    placeholder: string;
  }

  const formControls: FormControl[] = [
    {
      label: "Email",
      name: "email",
      placeholder: "Введите email",
    },
    {
      label: "Пароль",
      name: "password",
      placeholder: "Введите пароль",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-4">
        {formControls.map((control: FormControl) => {
          return (
            <FormField
              control={form.control}
              name={control.name}
              render={({ field }) => (
                <FormItem className="mb-0">
                  <FormLabel>{control.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={control.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <Button type="submit">Войти</Button>
      </form>
    </Form>
  );
}

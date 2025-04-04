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
  username: z
    .string()
    .min(2, { message: "Логин должен содержать минимум 2 символа" })
    .max(50, { message: "Логин не может быть длиннее 50 символов" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать минимум 8 символов" })
    .max(50, { message: "Пароль не может быть длиннее 50 символов" })
    .regex(
      /^(?=.*[A-Za-zа-яА-Я])(?=.*\d)(?=.*[!@#$%^&\(\)\"\'\`\=\-\_\*\+\/\?\|\^\~\<\>\[\]\{\}]).*$/,
      {
        message: "Пароль должен содержать хотя бы 1 букву, 1 цифру и 1 спецсимвол",
      }
    ),
  email: z.string().email({ message: "Некорректный email " }),
  confirmPassword: z.string(),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        message: "Пароли не совпадают",
      });

      return;
    } else {
      const { confirmPassword, ...rest } = values;

      console.log(rest);
    }
  }

  interface IFormControl {
    label: string;
    name: "username" | "password" | "email" | "confirmPassword";
    placeholder: string;
  }

  const formControls: IFormControl[] = [
    {
      label: "Логин",
      name: "username",
      placeholder: "Введите логин",
    },
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
    {
      label: "Подтвердите пароль",
      name: "confirmPassword",
      placeholder: "Введите пароль",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-4">
        {formControls.map((control: IFormControl) => {
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

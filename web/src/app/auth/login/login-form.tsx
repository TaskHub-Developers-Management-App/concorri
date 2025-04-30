"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Link, addToast } from "@heroui/react";
import { FormError, FormHeader } from "@/components/ui/form";
import { loginAction } from "./action";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormValues) {
        const response = await loginAction(data);

        if (response.success === true) {
            addToast({
                title: "Sucesso",
                description: response.message,
                color: 'success',
            });
            
            router.push('/');

            return;
        }

        addToast({
            title: "Erro",
            description: response.message,
            color: 'danger',
        });
    };

    return (
        <main className="w-full max-w-md space-y-4">
            <FormHeader
                title="Bem-vindo de volta"
                description="Entre na sua conta"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Input
                        label="E-mail"
                        type="email"
                        {...register("email")}
                    />
                    {
                        errors.email && (
                            <FormError className="text-red-500 text-sm">
                                {errors.email.message}
                            </FormError>
                        )
                    }
                </div>
                <div>
                    <Input
                        label="Senha"
                        type="password"
                        {...register("password")}
                    />
                    {
                        errors.password && (
                            <FormError className="text-red-500 text-sm">
                                {errors.password.message}
                            </FormError>
                        )
                    }
                </div>
                <Button color="primary" type="submit">
                    Entrar
                </Button>
                <footer className="w-full flex justify-center">
                    <Link
                        href="/auth/signup"
                        className="text-small text-primary hover:underline underline-offset-4 text-center"
                    >
                        Ainda não tenho uma conta
                    </Link>
                </footer>
            </form>
        </main>
    );
}

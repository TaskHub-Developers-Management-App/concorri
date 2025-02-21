"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Divider, Input, Button, Link } from "@heroui/react";

const loginSchema = z.object({
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    function onSubmit(data: LoginFormValues) {
        console.log("Tentativa de login com: ", data);
    };

    return (
        <main className="w-full max-w-md space-y-4">
            <header className="flex gap-3">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">Bem-vindo de volta</h1>
                    <p className="text-small text-default-500">Entre na sua conta</p>
                </div>
            </header>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Input
                        label="E-mail"
                        type="email"
                        {...register("email")}
                    />
                    {
                        errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
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
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
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

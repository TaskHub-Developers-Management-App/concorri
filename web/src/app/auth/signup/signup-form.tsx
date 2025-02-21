"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Divider, Input, Button, Link } from "@heroui/react";

const signUpSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    function onSubmit(data: SignUpFormValues) {
        console.log("Tentativa de cadastro com: ", data);
    };

    return (
        <main className="w-full max-w-md space-y-4">
            <header className="flex gap-3">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">Crie sua conta</h1>
                    <p className="text-small text-default-500">Preencha os campos abaixo para se cadastrar</p>
                </div>
            </header>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Input
                        label="Nome"
                        type="text"
                        {...register("name")}
                    />
                    {
                        errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )
                    }
                </div>
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
                    Cadastrar
                </Button>
                <footer className="w-full flex justify-center">
                    <Link
                        href="/auth/login"
                        className="text-small text-primary hover:underline underline-offset-4 text-center"
                    >
                        Já tenho uma conta
                    </Link>
                </footer>
            </form>
        </main>
    );
}
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, Button } from "@heroui/react";
import { z } from "zod";
import { LockClosedIcon, TrashIcon } from "@heroicons/react/20/solid";

const accountSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

export function AccountForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(accountSchema),
    });

    function onSubmit(data: AccountFormValues) {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <div>
                <Input
                    label="Nome"
                    type="text"
                    defaultValue="John Doe"
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
                    defaultValue="johndoe@example.com"
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
            <footer className="flex items-center justify-between">
                <div className="space-x-4">
                    <Button
                        type="button"
                        variant="faded"
                        startContent={<LockClosedIcon className="size-5" />}
                    >
                        Redefinir senha
                    </Button>
                    <Button
                        type="button"
                        variant="faded"
                        color="danger"
                        startContent={<TrashIcon className="size-5" />}
                    >
                        Excluir conta
                    </Button>
                </div>
                <Button type="submit" color="primary">
                    Salvar alterações
                </Button>
            </footer>
        </form>
    )
}
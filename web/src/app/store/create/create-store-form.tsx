"use client"

import { FormError, FormHeader } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, Button, Link } from "@heroui/react";

import { z } from "zod";

const CreateStoreFormSchema = z.object({
    name: z
        .string({ message: "Nome é obrigatório" })
        .trim()
        .min(6, { message: "Nome deve ter no mínimo 6 caracteres" }),
    address: z
        .string({ message: "Endereço é obrigatório" })
        .trim()
        .min(6, { message: "Endereço deve ter no mínimo 6 caracteres" }),
    phone: z
        .string({ message: "Telefone é obrigatório" })
        .trim()
        .min(11, { message: "Telefone deve ter no mínimo 11 caracteres" }),
});

type CreateStoreFormValues = z.infer<typeof CreateStoreFormSchema>;

export function CreateStoreForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(CreateStoreFormSchema),
    });

    function onSubmit(data: CreateStoreFormValues) {
        console.log("Tentativa de cadastro com: ", data);
    };

    return (
        <main className="w-full max-w-md space-y-4">
            <FormHeader
                title="Cadastre sua loja"
                description="Preencha os campos abaixo para cadastrar sua loja"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Input
                        label="Nome"
                        type="text"
                        {...register("name")}
                    />
                    {
                        errors.name && (
                            <FormError>
                                {errors.name.message}
                            </FormError>
                        )
                    }
                </div>
                <div>
                    <Input
                        label="Endereço"
                        type="text"
                        {...register("address")}
                    />
                    {
                        errors.name && (
                            <FormError>
                                {errors.address?.message}
                            </FormError>
                        )
                    }
                </div>
                <div>
                    <Input
                        label="Telefone"
                        type="text"
                        {...register("phone")}
                    />
                    {
                        errors.name && (
                            <FormError>
                                {errors.address?.message}
                            </FormError>
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
                        Já tenho uma loja cadastrada
                    </Link>
                </footer>
            </form>
        </main>
    )
}
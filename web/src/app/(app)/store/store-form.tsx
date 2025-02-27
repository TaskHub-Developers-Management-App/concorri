"use client"

import { FormError } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";

import { z } from "zod";

const storeFormSchema = z.object({
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

type StoreFormValues = z.infer<typeof storeFormSchema>;

export function StoreForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(storeFormSchema),
    });

    function onSubmit(data: StoreFormValues) {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <div>
                <Input
                    label="Nome"
                    type="text"
                    defaultValue="Loja do João"
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
                    defaultValue="Rua dos Programadores, 123"
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
                    defaultValue="(86) 9.9999-9999"
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
            <footer className="flex justify-end">
                <Button type="submit" color="primary">
                    Salvar alterações
                </Button>
            </footer>
        </form>
    )
}
"use client"

import { PlusIcon } from "@heroicons/react/20/solid";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Button,
    useDisclosure,
    Input,
    addToast,
} from "@heroui/react";
import { Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../../components/ui/form";
import { createLotteryAction } from "./actions";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { getLocalTimeZone, toZoned } from "@internationalized/date";

const lotterySchema = z.object({
    name: z
        .string({ message: "Nome do sorteio é obrigatório" })
        .trim()
        .min(1, "Nome do sorteio é obrigatório"),
    description: z
        .string({ message: "Descrição do sorteio é obrigatório" })
        .trim()
        .min(1, "Descrição do sorteio é obrigatório"),
    couponPrice: z
        .number({ message: "Preço do cupom é obrigatório" })
        .min(1, "Preço do cupom é obrigatório"),
    drawDate: z
        .string({ message: "Data do sorteio é obrigatória" })
        .trim()
});

type LotteryFormValues = z.infer<typeof lotterySchema>;

export function CreateLotteryDrawer() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LotteryFormValues>({
        resolver: zodResolver(lotterySchema),
    });

    async function onSubmit(data: LotteryFormValues) {

        console.log(data.drawDate);
        

        const response = await createLotteryAction({
            name: data.name,
            description: data.description,
            drawDate: data.drawDate,
            couponPrice: data.couponPrice
        });

        if (response.success === true) {
            addToast({
                title: "Sucesso",
                description: response.message,
                color: 'success',
            });

            return;
        }

        addToast({
            title: "Erro",
            description: response.message,
            color: 'danger',
        });
    };

    return (
        <>
            <Button onPress={onOpen} color="primary" startContent={<PlusIcon className="size-5" />}>
                Cadastrar Sorteio
            </Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                Cadastrar sorterio
                            </DrawerHeader>
                            <DrawerBody>
                                <form
                                    name="create-lottery-form"
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-4"
                                >
                                    <div>
                                        <Input
                                            label="Nome"
                                            type="text"
                                            placeholder="Digite o nome do sorteio"
                                            {...register("name")}
                                        />
                                        {
                                            errors.name && (
                                                <FormError className="text-red-500 text-sm">
                                                    {errors.name.message}
                                                </FormError>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Textarea
                                            label="Descrição"
                                            placeholder="Digite a descrição do sorterio"
                                            {...register("description")}
                                        />
                                        {
                                            errors.description && (
                                                <FormError className="text-red-500 text-sm">
                                                    {errors.description.message}
                                                </FormError>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Input
                                            label="Preço do cupom"
                                            type="number"
                                            placeholder="Digite o preço para emitir um cupom"
                                            {...register("couponPrice", { valueAsNumber: true })}
                                        />
                                        {
                                            errors.description && (
                                                <FormError className="text-red-500 text-sm">
                                                    {errors.description.message}
                                                </FormError>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Controller
                                            name="drawDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    label="Data do Sorteio"
                                                    onChange={(value) => {
                                                        if (!value) return;

                                                        const formatedDate = `${value.year}-${value.month.toString().padStart(2,'0')}-${value.day.toString().padStart(2,'0')}`

                                                        field.onChange(formatedDate) 
                                                    }}
                                                />
                                            )}
                                        />
                                        {
                                            errors.drawDate && (
                                                <FormError className="text-red-500 text-sm">
                                                    {errors.drawDate.message}
                                                </FormError>
                                            )
                                        }
                                    </div>
                                    <footer className="flex items-center justify-end gap-2">
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" type="submit">
                                            Cadastrar
                                        </Button>
                                    </footer>
                                </form>
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
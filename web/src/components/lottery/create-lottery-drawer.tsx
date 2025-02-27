"use client"

import { PlusIcon } from "@heroicons/react/20/solid";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Input,
} from "@heroui/react";
import { Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../ui/form";

const lotterySchema = z.object({
    name: z
        .string({ message: "Nome do sorteio é obrigatório" })
        .trim()
        .min(1, "Nome do sorteio é obrigatório"),
    description: z
        .string({ message: "Descrição do sorteio é obrigatório" })
        .trim()
        .min(1, "Descrição do sorteio é obrigatório"),
    drawDate: z
        .date({ message: "Data do sorteio é obrigatório" })
        .min(new Date(), "Data do sorteio deve ser maior que a data atual"),
});

type LotteryFormValues = z.infer<typeof lotterySchema>;

export function CreateLotteryDrawer() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(lotterySchema),
    });

    function onSubmit(data: LotteryFormValues) {
        console.log("Tentativa de cadastro de sorteio com: ", data);
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
                                        <DatePicker
                                            label="Data do Sorteio"
                                            onChange={(value) => {
                                                if (value) {
                                                    register("drawDate").onChange({
                                                        target: { value },
                                                        type: "change"
                                                    })
                                                }
                                            }}
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
                                        <Button color="primary" type="submit" form="create-lottery-form">
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
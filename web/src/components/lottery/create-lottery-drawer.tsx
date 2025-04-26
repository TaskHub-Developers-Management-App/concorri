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
    couponPrice: z
        .number({ message: "Preço do cupom é obrigatório" })
        .min(1, "Preço do cupom é obrigatório"),
  
    drawDate: z
        .any()
        .refine((val) => val != null, { message: "Data do sorteio é obrigatória" })
        .refine((val) => new Date(val) > new Date(), {
          message: "A data do sorteio deve ser maior que a data atual",
        }),
        
});

type LotteryFormValues = z.infer<typeof lotterySchema>;

export function CreateLotteryDrawer() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(lotterySchema),
    });
    const drawDate = watch("drawDate");

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
                                        <DatePicker
                                            label="Data do Sorteio"
                                            value={drawDate}
                                            onChange={(value =>{
                                                if(value){
                                                    setValue("drawDate",value, {shouldValidate:true});
                                                }
                                            })}
                                            
                                        />
                                        {
                                            errors.drawDate && (
                                                <FormError className="text-red-500 text-sm">
                                                    {String(errors.drawDate?.message || "")}
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
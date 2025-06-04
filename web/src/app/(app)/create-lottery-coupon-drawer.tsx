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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../../components/ui/form";
import { createCouponsAction } from "./actions";
import { useParams } from "next/navigation";

const couponSchema = z.object({
    customerName: z
        .string({ message: "Nome do cliente é obrigatório" })
        .trim()
        .min(1, "Nome do cliente é obrigatório"),
    customerPhone: z
        .string({ message: "Telefone do cliente é obrigatório" })
        .trim()
        .min(1, "Telefone do cliente é obrigatório"),
    customerAddress: z
        .string({ message: "Endereço do cliente é obrigatório" })
        .trim()
        .min(1, "Endereço do cliente é obrigatório"),
    customerCPF: z
        .string({ message: "CPF do cliente é obrigatório" })
        .trim()
        .min(1, "CPF do cliente é obrigatório"),
    purchasePrice: z
        .number({ message: "Preço da compra é obrigatório" })
        .min(1, "Preço da compra é obrigatório"),
});

type CouponFormValues = z.infer<typeof couponSchema>;

export function CreateLotteryCouponDrawer() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const params = useParams();
    const lotteryId = params.id as string

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(couponSchema),
    });

    async function onSubmit(data: CouponFormValues) {
        const response = await createCouponsAction({
            ...data,
            lotteryId
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

        reset();
        onOpenChange();
    };

    return (
        <>
            <Button onPress={onOpen} color="primary" startContent={<PlusIcon className="size-5" />}>
                Gerar Cupons
            </Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                Gerador de Cupons
                            </DrawerHeader>
                            <DrawerBody>
                                <form
                                    name="create-lottery-coupon-form"
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-4"
                                >
                                    <div>
                                        <Input
                                            label="Nome do Cliente"
                                            type="text"
                                            placeholder="Digite o nome do cliente"
                                            {...register("customerName")}
                                        />
                                        {errors.customerName && (
                                            <FormError className="text-red-500 text-sm">
                                                {errors.customerName.message}
                                            </FormError>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            label="Telefone"
                                            type="tel"
                                            placeholder="Digite o telefone do cliente"
                                            {...register("customerPhone")}
                                        />
                                        {errors.customerPhone && (
                                            <FormError className="text-red-500 text-sm">
                                                {errors.customerPhone.message}
                                            </FormError>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            label="Endereço"
                                            type="text"
                                            placeholder="Digite o endereço do cliente"
                                            {...register("customerAddress")}
                                        />
                                        {errors.customerAddress && (
                                            <FormError className="text-red-500 text-sm">
                                                {errors.customerAddress.message}
                                            </FormError>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            label="CPF"
                                            type="text"
                                            placeholder="Digite o CPF do cliente"
                                            {...register("customerCPF")}
                                        />
                                        {errors.customerCPF && (
                                            <FormError className="text-red-500 text-sm">
                                                {errors.customerCPF.message}
                                            </FormError>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            label="Valor da Compra"
                                            type="number"
                                            placeholder="Digite o valor da compra"
                                            {...register("purchasePrice", { valueAsNumber: true })}
                                        />
                                        {errors.purchasePrice && (
                                            <FormError className="text-red-500 text-sm">
                                                {errors.purchasePrice.message}
                                            </FormError>
                                        )}
                                    </div>

                                    <footer className="flex items-center justify-end gap-2">
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" type="submit">
                                            Gerar cupons
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
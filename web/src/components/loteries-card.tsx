"use client"

import {
    CalendarDaysIcon,
    EllipsisVerticalIcon
} from "@heroicons/react/20/solid";

import {
    Card,
    CardHeader,
    CardBody
} from "@heroui/card";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";

export function LotteryCard() {
    return (
        <Card className="rounded-md bg-white shadow-md p-2">
            <CardHeader className="flex items-center justify-between flex-row w-full">
                <h2 className="font-medium text-md">
                    Sorteio de Natal
                </h2>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <EllipsisVerticalIcon className="size-5" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User menu">
                        <DropdownItem key="view">
                            Visualizar
                        </DropdownItem>
                        <DropdownItem key="edit">
                            Editar
                        </DropdownItem>
                        <DropdownItem key="delete" color="danger">
                            Excluir
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </CardHeader>
            <CardBody>
                <div className="text-sm text-gray-500 flex flex-row items-center gap-2">
                    <CalendarDaysIcon className="size-5" />
                    <span>20/03/2025</span>
                </div>
            </CardBody>
        </Card>
    )
}
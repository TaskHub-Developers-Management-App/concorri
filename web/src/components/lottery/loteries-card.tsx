"use client"

import {
    CalendarDaysIcon,
} from "@heroicons/react/20/solid";

import {
    Card,
    CardHeader,
    CardBody
} from "@heroui/card";

import Link from "next/link";

export function LotteryCard() {
    return (
        <Link href="/lottery/123">
            <Card className="rounded-md bg-white shadow-md p-2 cursor-pointer hover:bg-gray-50 transition-colors">
                <CardHeader className="flex items-center justify-between flex-row w-full">
                    <h2 className="font-medium text-md">
                        Sorteio de Natal
                    </h2>
                </CardHeader>
                <CardBody>
                    <div className="text-sm text-gray-500 flex flex-row items-center gap-2">
                        <CalendarDaysIcon className="size-5" />
                        <span>20/03/2025</span>
                    </div>
                </CardBody>
            </Card>
        </Link>
    )
}
'use client'

import Link from "next/link";
import Image from "next/image";

import {
    BuildingStorefrontIcon,
    TicketIcon,
    UserIcon
} from "@heroicons/react/24/outline";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";

import {
    Avatar
} from "@heroui/avatar";

import logo from "@/assets/logo.svg";

export function Header() {
    return (
        <header className="bg-white shadow-md flex items-center justify-center">
            <Navbar
                classNames={{
                    item: [
                        "flex",
                        "relative",
                        "h-full",
                        "items-center",
                        "data-[active=true]:after:content-['']",
                        "data-[active=true]:after:absolute",
                        "data-[active=true]:after:bottom-0",
                        "data-[active=true]:after:left-0",
                        "data-[active=true]:after:right-0",
                        "data-[active=true]:after:h-[2px]",
                        "data-[active=true]:after:rounded-[2px]",
                        "data-[active=true]:after:bg-primary",
                    ],
                }}
            >
                <NavbarBrand>
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Concorri"
                            width={120}
                            height={40}
                        />
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-10" justify="center">
                    <NavbarItem isActive>
                        <Link aria-current="page" href="#" className="flex items-center gap-2">
                            <TicketIcon className="w-5 h-5" />
                            Sorteios
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link aria-current="page" href="#" className="flex items-center gap-2">
                            <UserIcon className="w-5 h-5" />
                            Minha Conta
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#" className="flex items-center gap-2">
                            <BuildingStorefrontIcon className="w-5 h-5" />
                            Minha Loja
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    as="button"
                                    className="transition-transform"
                                    color="primary"
                                    name="John Doe"
                                    size="sm"
                                    fallback="JD"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User menu">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">john.doe@example.com</p>
                                </DropdownItem>
                                <DropdownItem key="help_and_feedback">Ajuda e Suporte</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Sair
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </header>
    );
}
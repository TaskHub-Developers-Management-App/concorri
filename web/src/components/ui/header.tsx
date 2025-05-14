'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
    BuildingStorefrontIcon,
    TicketIcon,
    UserIcon,
    ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";

import logo from "@/assets/logo.svg";
import { ProfileButton } from "./profile-button";

type Props = {
    children: React.ReactNode;
}

export function Header({ children }: Props) {

    const pathname = usePathname();

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
                    <NavbarItem isActive={pathname === '/'}>
                        <Link aria-current="page" href="/" className="flex items-center gap-2">
                            <TicketIcon className="w-5 h-5" />
                            Meus Sorteios
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={pathname === '/account'}>
                        <Link aria-current="page" href="/account" className="flex items-center gap-2">
                            <UserIcon className="w-5 h-5" />
                            Minha Conta
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={pathname === '/store'}>
                        <Link color="foreground" href="/store" className="flex items-center gap-2">
                            <BuildingStorefrontIcon className="w-5 h-5" />
                            Minha Loja
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="danger" href="/auth/signout" className="flex items-center gap-2">
                            <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                            Sair
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        {children}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </header>
    );
}
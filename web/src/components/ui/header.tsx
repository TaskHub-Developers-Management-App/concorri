'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BuildingStorefrontIcon,
    TicketIcon,
    UserIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from '@heroui/navbar';
import { Logo } from '../logo';

type Props = {
    children: React.ReactNode;
};

export function Header({ children }: Props) {
    const pathname = usePathname();

    const links = [
        {
            href: '/',
            label: 'Meus Sorteios',
            icon: TicketIcon
        },
        {
            href: '/account',
            label: 'Minha Conta',
            icon: UserIcon
        },
        {
            href: '/store',
            label: 'Minha Loja',
            icon: BuildingStorefrontIcon
        }
    ];

    return (
        <header className="bg-white shadow-sm border-b border-gray-100">
            <Navbar
                maxWidth="xl"
                classNames={{
                    item: [
                        "flex",
                        "relative",
                        "h-full",
                        "items-center",
                        "px-3",
                        "rounded-md",
                        "transition-colors",
                        "data-[hover=true]:bg-gray-100",
                        "data-[active=true]:bg-primary/10",
                        "data-[active=true]:text-primary",
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
                    <Logo />
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-6" justify="center">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;

                        return (
                            <NavbarItem key={link.href} isActive={isActive}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-2 py-2 transition-colors ${
                                        isActive ? 'text-primary' : 'text-gray-700'
                                    } hover:text-primary`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{link.label}</span>
                                </Link>
                            </NavbarItem>
                        );
                    })}

                    {/* Sair */}
                    <NavbarItem>
                        <Link
                            href="/auth/signout"
                            className="flex items-center gap-2 py-2 text-danger hover:bg-danger/10 rounded-md transition-colors"
                        >
                            <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                            <span>Sair</span>
                        </Link>
                    </NavbarItem>

                    {/* Slot para botão adicional (ex.: criar sorteio) */}
                    <NavbarItem>
                        {children}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </header>
    );
}

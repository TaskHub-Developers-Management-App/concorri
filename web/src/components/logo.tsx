import Link from "next/link";
import Image from "next/image";

import logo from '@/assets/logo.svg';

export function Logo() {
    return (
        <Link href="/">
            <Image
                src={logo}
                alt="Concorri"
                width={120}
                height={40}
            />
        </Link>
    )
}
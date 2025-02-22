import logo from "@/assets/logo.svg";
import Image from "next/image";

export default function AuthLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col px-4 relative">
            <Image 
                src={logo}
                alt="Concorri"
                width={150}
                height={150}
                className="absolute top-10 left-10"
            />
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    );
}
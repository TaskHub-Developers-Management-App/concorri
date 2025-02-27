import { Header } from "@/components/ui/header";

export default function AppLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="max-w-[1024px] mx-auto mt-10">
                {children}
            </main>
        </>
    );
}
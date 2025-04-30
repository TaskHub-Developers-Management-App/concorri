import { Header } from "@/components/ui/header";
import { ProfileButton } from "@/components/ui/profile-button";

export default function AppLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header>
                <ProfileButton />
            </Header>
            <main className="max-w-[1024px] mx-auto mt-10">
                {children}
            </main>
        </>
    );
}
import { Header } from "@/components/header";
import { LotteryCard } from "@/components/loteries-card";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

export default function HomePage() {
    return (
        <>
            <Header />
            <main className="flex flex-col items-start max-w-[1024px] mx-auto mt-10">
                <header className="flex justify-between items-center w-full">
                    <h1 className="text-2xl font-semibold">
                        Meus Sorteios
                    </h1>
                    <Button color="primary" startContent={<PlusIcon className="size-5" />}>
                        Criar sorteio
                    </Button>
                </header>
                <Divider className="my-4" />
                <div className="grid grid-cols-4 w-full">
                    <LotteryCard />
                </div>
            </main>
        </>
    )
}
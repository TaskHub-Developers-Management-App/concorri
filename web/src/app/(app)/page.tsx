import { LotteryCard } from "@/components/lottery/loteries-card";;
import { Divider } from "@heroui/divider";
import { CreateLotteryDrawer } from "@/components/lottery/create-lottery-drawer";
import { findAllUserLotteriesRequest } from "@/http/lottery/find-all-lotteries.http";

export default async function HomePage() {

    const { data } = await findAllUserLotteriesRequest()

    return (
        <div className="flex flex-col items-start max-w-[1024px] mx-auto mt-10">
            <header className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-semibold">
                    Meus Sorteios
                </h1>
                <CreateLotteryDrawer />
            </header>
            <Divider className="my-4" />
            <div className="grid grid-cols-4 w-full">
                {data.map((lottery) => (
                    <LotteryCard
                        key={lottery.id}
                        id={lottery.id}
                        name={lottery.name}
                        drawDate={lottery.drawDate}
                    />
                ))}
            </div>
        </div>
    )
}
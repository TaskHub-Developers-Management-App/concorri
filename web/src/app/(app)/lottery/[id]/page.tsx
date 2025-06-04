import { CreateLotteryCouponDrawer } from "@/app/(app)/create-lottery-coupon-drawer";
import { CouponsTable } from "@/components/coupons-table";
import { Divider } from "@heroui/react";

export default function LotteryPage() {
    return (
        <div className="flex flex-col items-start max-w-[1024px] mx-auto mt-10">
            <header className="w-full">
                <header className="flex justify-between items-center w-full">
                    <h1 className="text-2xl font-semibold">
                        Sorteio de Natal
                    </h1>
                    <CreateLotteryCouponDrawer />
                </header>
            </header>
            <Divider className="my-4" />
            <CouponsTable />
        </div>
    )
}
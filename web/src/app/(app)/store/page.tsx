import { Divider} from "@heroui/react";
import { StoreForm } from "./store-form";

export default function StorePage() {
    return (
        <div className="flex flex-col items-start max-w-[1024px] mx-auto mt-10">
            <header className="w-full">
                <h1 className="text-2xl font-semibold">
                    Minha Loja
                </h1>
            </header>
            <Divider className="my-4" />
            <StoreForm />
        </div>
    )
}
import { Divider} from "@heroui/react";
import { AccountForm } from "./account-form";

export default function AccountPage() {
    return (
        <div className="flex flex-col items-start max-w-[1024px] mx-auto mt-10">
            <header className="w-full">
                <h1 className="text-2xl font-semibold">
                    Minha Conta
                </h1>
            </header>
            <Divider className="my-4" />
            <AccountForm />
        </div>
    )
}
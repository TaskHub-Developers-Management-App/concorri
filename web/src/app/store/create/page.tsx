import Image from "next/image";
import logo from "@/assets/logo.svg";
import { CreateStoreForm } from "./create-store-form";

export default function CreateStorePage() {
    return (
        <div className="relative h-dvh w-full flex justify-center items-center">
            <Image
                src={logo}
                alt="Concorri"
                width={150}
                height={150}
                className="absolute top-10 left-10"
            />
            <CreateStoreForm />
        </div>
    )
}
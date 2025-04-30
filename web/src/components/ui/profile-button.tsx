import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";

import {
    Avatar
} from "@heroui/avatar";
import { getUserProfileRequest } from "@/http/auth/get-user-profile.http";

export async function ProfileButton() {

    const { user } = await getUserProfileRequest();

    function getInitials(name: string) {
        const [firstName, lastName] = name.split(' ');
        return `${firstName[0]}${lastName ? lastName[0] : ''}`;
    }

    return (
        <div className="flex flex-row gap-1 items-center">
            <div>
                <Avatar
                    as="div"
                    color="primary"
                    name={user.name}
                    size="sm"
                    fallback={getInitials(user.name)}
                />
            </div>
            <div className="flex flex-col gap-0.5 items-start">
                <span className="text-sm text-slate-900 font-medium">
                    {user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                    {user.email}
                </span>
            </div>
        </div>
    )
}
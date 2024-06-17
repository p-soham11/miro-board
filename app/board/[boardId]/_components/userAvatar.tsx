/** @format */

import { Hint } from "@/components/hint";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
    src?: string;
    name?: string;
    fallback?: string;
    borderColor?: string;
}

export const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor,
}: UserAvatarProps) => {
    return (
        <Hint label={name || "Anonymous"} side="bottom" sideOffset={8}>
            <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
                <AvatarImage src={src} />
                <AvatarFallback className="test-xs font-semibold">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hint>
    );
};

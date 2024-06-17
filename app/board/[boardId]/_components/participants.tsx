/** @format */

"use client";

import { randomColor } from "@/lib/utils";
import { UserAvatar } from "./userAvatar";
import { useOthers, useSelf } from "@/liveblocks.config";

const MAX_AVATARS = 1;

export const Participants = () => {
    const users = useOthers();
    const me = useSelf();
    const hasMoreUsers = users.length > MAX_AVATARS;

    return (
        <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_AVATARS).map(({ connectionId, info }) => {
                    return (
                        <UserAvatar
                            borderColor={randomColor(connectionId)}
                            key={connectionId}
                            src={info?.picture}
                            name={info?.name}
                            fallback={info?.name?.[0] || "?"}
                        />
                    );
                })}
                {me && (
                    <UserAvatar
                        borderColor={randomColor(me.connectionId)}
                        src={me.info?.picture}
                        name={`${me.info?.name} (You)`}
                        fallback={me.info?.name?.[0] || "?"}
                    />
                )}
                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length - MAX_AVATARS} more`}
                        fallback={`+${users.length - MAX_AVATARS}`}
                    />
                )}
            </div>
        </div>
    );
};

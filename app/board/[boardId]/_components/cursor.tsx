/** @format */

"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { randomColor } from "@/lib/utils";
import { useOther } from "@/liveblocks.config";

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
    const info = useOther(connectionId, (user) => user.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor);

    const name = info?.name || "Anonymous";

    const { x, y } = cursor || { x: 0, y: 0 };

    if (!cursor) {
        return null;
    }

    return (
        <foreignObject
            // Translation Error Comeback
            style={{ transform: `translate(${x}px, ${y}px)` }}
            // style={{ transform: `translate(${x}px) translate(${y}px)` }}
            height={50}
            width={name.length * 10 + 24}
            className="relative drop-shadow-md"
        >
            <MousePointer2
                className="h-5 w-5"
                style={{
                    fill: randomColor(connectionId),
                    color: randomColor(connectionId),
                }}
            />
            <div
                className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
                style={{ backgroundColor: randomColor(connectionId) }}
            >
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";

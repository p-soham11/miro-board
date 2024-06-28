/** @format */

import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";

const handFont = Kalam({
    subsets: ["latin"],
    weight: "400",
});

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: TextProps) => {
    const { x, y, width, height, fill, value } = layer;

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor
                    ? `1px solid ${selectionColor}`
                    : "none",
            }}
        >
            <ContentEditable
                html={"Text"}
                onChange={() => {}}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                    handFont.className
                )}
                style={{ color: fill ? colorToCss(fill) : "#1e1e1e" }}
            />
        </foreignObject>
    );
};

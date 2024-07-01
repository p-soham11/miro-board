/** @format */

import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { NoteLayer } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";

const handFont = Kalam({
    subsets: ["latin"],
    weight: "400",
});

const calcFontSize = (width: number, height: number) => {
    const maxFontSize = 100;
    const scaleFactor = 0.16;
    const checkFontSize = Math.min(width, height) * scaleFactor;
    const fontSize = Math.min(checkFontSize, maxFontSize);

    return fontSize;
};

interface NoteProps {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const Note = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: NoteProps) => {
    const { x, y, width, height, fill, value } = layer;

    const updateText = useMutation(({ storage }, newText: string) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newText);
    }, []);

    const handleTextChange = (e: ContentEditableEvent) => {
        updateText(e.target.value);
    };

    console.log("Inside Note");

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
            className="shadow-md drop-shadow-xl"
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleTextChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center outline-none",
                    handFont.className
                )}
                style={{
                    fontSize: calcFontSize(width, height),
                    color: "#494f4f",
                    backgroundColor: fill ? colorToCss(fill) : "#fff98c",
                }}
            />
        </foreignObject>
    );
};

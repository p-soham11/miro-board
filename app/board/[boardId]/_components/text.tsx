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

const calcFontSize = (width: number, height: number) => {
    const maxFontSize = 100;
    const scaleFactor = 0.5;
    const checkFontSize = Math.min(width, height) * scaleFactor;
    const fontSize = Math.min(checkFontSize, maxFontSize);

    return fontSize;
};

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

    const updateText = useMutation(({ storage }, newText: string) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newText);
    }, []);

    const handleTextChange = (e: ContentEditableEvent) => {
        updateText(e.target.value);
    };

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
                html={value || "Text"}
                onChange={handleTextChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                    handFont.className
                )}
                style={{
                    fontSize: calcFontSize(width, height),
                    color: fill ? colorToCss(fill) : "#1e1e1e",
                }}
            />
        </foreignObject>
    );
};

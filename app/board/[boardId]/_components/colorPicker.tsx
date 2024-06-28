/** @format */

"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
    return (
        <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
            <ColorButton
                onClick={onChange}
                color={{ r: 243, g: 207, b: 122 }}
            />
            <ColorButton onClick={onChange} color={{ r: 255, g: 89, b: 89 }} />
            <ColorButton onClick={onChange} color={{ r: 33, g: 230, b: 193 }} />
            <ColorButton
                onClick={onChange}
                color={{ r: 167, g: 255, b: 131 }}
            />
            <ColorButton
                onClick={onChange}
                color={{ r: 134, g: 166, b: 233 }}
            />
            <ColorButton onClick={onChange} color={{ r: 255, g: 164, b: 92 }} />
            <ColorButton onClick={onChange} color={{ r: 50, g: 78, b: 123 }} />
            <ColorButton onClick={onChange} color={{ r: 34, g: 39, b: 39 }} />
        </div>
    );
};

interface colorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({ onClick, color }: colorButtonProps) => {
    return (
        <button
            className="w-8 h-8  item-center flex justify-center hover:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div
                className="w-8 h-8 rounded-md border border-neutral-300"
                style={{ background: colorToCss(color) }}
            ></div>
        </button>
    );
};

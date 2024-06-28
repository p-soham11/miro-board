/** @format */

"use client";

import { useSelectionBounds } from "@/hooks/useSelectionBounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./colorPicker";
import { useDeleteLayers } from "@/hooks/useDeleteLayers";
import { Hint } from "@/components/hint";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
    ({ camera, setLastUsedColor }: SelectionToolsProps) => {
        const selection = useSelf((me) => me.presence.selection);

        const setFill = useMutation(
            ({ storage }, fill: Color) => {
                const liveLayers = storage.get("layers");
                setLastUsedColor(fill);

                selection.forEach((id) => {
                    liveLayers.get(id)?.set("fill", fill);
                });
            },
            [selection, setLastUsedColor]
        );

        const deleteLayers = useDeleteLayers();

        const selectionBounds = useSelectionBounds();

        if (!selectionBounds) {
            return null;
        }

        const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
        const y = selectionBounds.y + camera.y;

        return (
            <div
                className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none "
                style={{
                    transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
                }}
            >
                <ColorPicker onChange={setFill} />
                <div className="flex items-center ml-2  border-neutral-200 max-w-[45px] ">
                    <Hint label="Delete" side="right" sideOffset={15}>
                        <Button
                            variant="light"
                            size="sm"
                            className=" -ml-3"
                            onClick={deleteLayers}
                        >
                            <Trash />
                        </Button>
                    </Hint>
                </div>
            </div>
        );
    }
);

SelectionTools.displayName = "SelectionTools";

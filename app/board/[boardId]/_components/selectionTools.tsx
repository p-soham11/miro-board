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
import { Trash, PanelBottomOpen, PanelTopOpen } from "lucide-react";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
    ({ camera, setLastUsedColor }: SelectionToolsProps) => {
        const selection = useSelf((me) => me.presence.selection);

        const moveToBack = useMutation(
            ({ storage }) => {
                const liveLayerIds = storage.get("layerIds");
                const indices: number[] = [];

                const arr = liveLayerIds.toArray();
                for (let i = 0; i < arr.length; i++) {
                    if (selection.includes(arr[i])) {
                        indices.push(i);
                    }
                }

                for (let i = 0; i < indices.length; i++) {
                    liveLayerIds.move(indices[i], i);
                }
            },
            [selection]
        );

        const bringToFront = useMutation(
            ({ storage }) => {
                const liveLayerIds = storage.get("layerIds");
                const indices: number[] = [];

                const arr = liveLayerIds.toArray();
                for (let i = 0; i < arr.length; i++) {
                    if (selection.includes(arr[i])) {
                        indices.push(i);
                    }
                }

                for (let i = indices.length - 1; i >= 0; i--) {
                    liveLayerIds.move(
                        indices[i],
                        arr.length - 1 - (indices.length - 1 - i)
                    );
                }
            },
            [selection]
        );

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
                <div className="flex flex-col gap-y-0.5">
                    <Hint label="Move to top" side="right" sideOffset={15}>
                        <Button
                            variant="light"
                            size="sm"
                            onClick={bringToFront}
                        >
                            <PanelBottomOpen />
                        </Button>
                    </Hint>
                    <Hint label="Move to back" side="right" sideOffset={15}>
                        <Button variant="light" size="sm" onClick={moveToBack}>
                            <PanelTopOpen />
                        </Button>
                    </Hint>
                </div>
                <div className="flex items-center ml-2 border-l border-neutral-200 ">
                    <Hint label="Delete" side="right" sideOffset={15}>
                        <Button
                            variant="light"
                            size="sm"
                            className=" ml-2 -mr-1"
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

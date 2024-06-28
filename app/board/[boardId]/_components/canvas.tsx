/** @format */

"use client";

import { use, useCallback, useMemo, useState } from "react";
import {
    useHistory,
    useSelf,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStorage,
    useOthersMapped,
} from "@/liveblocks.config";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import {
    Camera,
    CanvasMode,
    CanvasState,
    Color,
    LayerType,
    Point,
    Side,
    XYWH,
} from "@/types/canvas";
import { CursorsPresence } from "./cursorsPresence";
import { set } from "date-fns";
import {
    pointerEventToCanvasPoint,
    randomColor,
    resizeBounds,
} from "@/lib/utils";
import { root } from "postcss";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layerPreview";
import { SelectionBox } from "./selectionBox";
import { SelectionTools } from "./selectionTools";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
    const info = useSelf((me) => me.info);
    // console.log(info);
    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 30,
        g: 30,
        b: 30,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation(
        (
            { storage, setMyPresence },
            layerType:
                | LayerType.Rectangle
                | LayerType.Ellipse
                | LayerType.Note
                | LayerType.Text,
            position: Point
        ) => {
            // Break if the user has reached the maximum number of layers (100 in this case)
            const liveLayer = storage.get("layers");
            if (liveLayer.size >= MAX_LAYERS) {
                return;
            }

            const liveLayerIds = storage.get("layerIds");
            const layerId = nanoid();
            const layer = new LiveObject({
                type: layerType,
                x: position.x,
                y: position.y,
                width: 100,
                height: 100,
                fill: lastUsedColor,
            });

            liveLayerIds.push(layerId);
            liveLayer.set(layerId, layer);
            setMyPresence({ selection: [layerId] }, { addToHistory: true });
            setCanvasState({ mode: CanvasMode.None });
        },
        [lastUsedColor]
    );

    const resizeLayer = useMutation(
        ({ storage, self }, point: Point) => {
            if (canvasState.mode !== CanvasMode.Resizing) {
                return;
            }

            const bounds = resizeBounds(
                canvasState.initialBounds,
                canvasState.corner,
                point
            );

            const liveLayers = storage.get("layers");
            const layer = liveLayers.get(self.presence.selection[0]);

            if (layer) {
                layer.update(bounds);
            }
        },
        [canvasState]
    );

    const unSelectLayers = useMutation(({ self, setMyPresence }) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: [] });
        }
    }, []);

    const translateSelectedLayers = useMutation(
        ({ storage, self }, point: Point) => {
            if (canvasState.mode !== CanvasMode.Translating) {
                return;
            }

            const offset = {
                x: point.x - canvasState.current.x,
                y: point.y - canvasState.current.y,
            };

            const liveLayers = storage.get("layers");
            for (const id of self.presence.selection) {
                const layer = liveLayers.get(id);
                if (layer) {
                    layer.update({
                        x: layer.get("x") + offset.x,
                        y: layer.get("y") + offset.y,
                    });
                }
            }

            setCanvasState({ mode: CanvasMode.Translating, current: point });
        },
        [canvasState]
    );

    const onResizeHandlePointerDown = useCallback(
        (corner: Side, initialBounds: XYWH) => {
            history.pause();
            setCanvasState({
                mode: CanvasMode.Resizing,
                corner,
                initialBounds,
            });
        },
        [history]
    );

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }));
    }, []);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            const point = pointerEventToCanvasPoint(e, camera);

            if (canvasState.mode === CanvasMode.Inserting) {
                return;
            }

            // Add case for drawing

            setCanvasState({ origin: point, mode: CanvasMode.Pressing });
        },
        [canvasState.mode, camera, setCanvasState]
    );

    const onPointerMove = useMutation(
        ({ setMyPresence }, e: React.PointerEvent) => {
            e.preventDefault();
            const current = pointerEventToCanvasPoint(e, camera);
            // console.log(current);

            if (canvasState.mode === CanvasMode.Translating) {
                translateSelectedLayers(current);
            } else if (canvasState.mode === CanvasMode.Resizing) {
                resizeLayer(current);
            }

            setMyPresence({ cursor: current });
        },
        [canvasState, resizeLayer, camera, translateSelectedLayers]
    );

    const onPointerUp = useMutation(
        ({}, e) => {
            const point = pointerEventToCanvasPoint(e, camera);

            if (
                canvasState.mode === CanvasMode.None ||
                canvasState.mode === CanvasMode.Pressing
            ) {
                // Unselecting any selection
                unSelectLayers();
                setCanvasState({ mode: CanvasMode.None });
            } else if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point);
            } else {
                setCanvasState({ mode: CanvasMode.None });
            }

            history.resume();
        },
        [camera, canvasState, insertLayer, history, unSelectLayers]
    );

    const selections = useOthersMapped((other) => other.presence.selection);

    const onLayerPointerDown = useMutation(
        ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
            if (
                canvasState.mode === CanvasMode.Pencil ||
                canvasState.mode === CanvasMode.Inserting
            ) {
                return;
            }
            history.pause();
            e.stopPropagation();

            const point = pointerEventToCanvasPoint(e, camera);

            if (!self.presence.selection.includes(layerId)) {
                setMyPresence({ selection: [layerId] });
                // Not adding selection to history here!
            }
            setCanvasState({ mode: CanvasMode.Translating, current: point });
        },
        [setCanvasState, camera, history, canvasState.mode]
    );

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};
        for (const user of selections) {
            const [connectionId, selection] = user;
            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = randomColor(connectionId);
            }
        }
        return layerIdsToColorSelection;
    }, [selections]);

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canUndo={canUndo}
                canRedo={canRedo}
                undo={history.undo}
                redo={history.redo}
            />
            <SelectionTools
                camera={camera}
                setLastUsedColor={setLastUsedColor}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
                onPointerDown={onPointerDown}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    {layerIds.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdsToColorSelection[layerId]}
                        />
                    ))}
                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    );
};

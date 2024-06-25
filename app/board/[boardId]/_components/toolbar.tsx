/** @format */

import {
    Circle,
    MousePointer2,
    Pencil,
    Redo,
    Square,
    StickyNote,
    Type,
    Undo2,
} from "lucide-react";
import { ToolButton } from "./toolButton";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canRedo,
    canUndo,
}: ToolbarProps) => {
    return (
        <div className=" absolute top-[45%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md flex flex-col gap-y-2 items-center shadow-md py-2 px-1">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                />
                <ToolButton
                    label="Pencil"
                    icon={Pencil}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Pencil,
                        })
                    }
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Text,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                />
                <ToolButton
                    label="Stricky Note"
                    icon={StickyNote}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Note,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Rectangle,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Ellipse,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                />
            </div>
            <div className="bg-white rounded-md p-1 flex flex-col items-center shadow-md">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    onClick={undo}
                    isDisabled={!canUndo}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo}
                    onClick={redo}
                    isDisabled={!canRedo}
                />
            </div>
        </div>
    );
};

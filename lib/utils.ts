/** @format */

import {
    Camera,
    Color,
    Side,
    EllipseLayer,
    Layer,
    LayerType,
    XYWH,
    Point,
    PathLayer,
} from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#21e6c1", "#ff5959", "#ffa45c", "#324e7b", "#775ada"];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function randomColor(connectionId: number) {
    return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
    e: React.PointerEvent,
    camera: Camera
) {
    return {
        x: Math.round(e.clientX) - camera.x,
        y: Math.round(e.clientY) - camera.y,
    };
}

export function colorToCss(color: Color) {
    return `#${color.r.toString(16).padStart(2, "0")}${color.g
        .toString(16)
        .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
    const result = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
    };

    if ((corner & Side.Left) === Side.Left) {
        result.x = Math.min(bounds.x + bounds.width, point.x);
        result.width = Math.abs(bounds.x + bounds.width - point.x);
    }

    if ((corner & Side.Right) === Side.Right) {
        result.x = Math.min(bounds.x, point.x);
        result.width = Math.abs(point.x - bounds.x);
    }

    if ((corner & Side.Top) === Side.Top) {
        result.y = Math.min(bounds.y + bounds.height, point.y);
        result.height = Math.abs(bounds.y + bounds.height - point.y);
    }

    if ((corner & Side.Bottom) === Side.Bottom) {
        result.y = Math.min(bounds.y, point.y);
        result.height = Math.abs(point.y - bounds.y);
    }

    return result;
}

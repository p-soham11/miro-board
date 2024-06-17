/** @format */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#21e6c1", "#ff5959", "#ffa45c", "#324e7b", "#775ada"];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function randomColor(connectionId: number) {
    return COLORS[connectionId % COLORS.length];
}

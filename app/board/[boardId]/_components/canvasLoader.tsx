/** @format */

import { Skeleton } from "@nextui-org/skeleton";

import { Spinner } from "@nextui-org/spinner";
import { Info } from "./info";

export const CanvasLoader = () => {
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
            <Spinner
                size="lg"
                label="Hold tight! We are fetching your Board 🚀"
                color="success"
                className="gap-4"
                labelColor="primary"
            />
        </main>
    );
};

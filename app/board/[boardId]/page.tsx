/** @format */

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { CanvasLoader } from "./_components/canvasLoader";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
    return (
        <Room roomId={params.boardId} fallback={<CanvasLoader />}>
            <Canvas boardId={params.boardId} />
        </Room>
    );
};

export default BoardIdPage;

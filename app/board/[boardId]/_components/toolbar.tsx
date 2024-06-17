/** @format */

export const Toolbar = () => {
    return (
        <div className=" absolute top-[45%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md">
                <div>Pencil</div>
                <div>Ereaser</div>
                <div>Circle</div>
                <div>Brush</div>
                <div>Square</div>
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <div>Undo</div>
                <div>Redo</div>
            </div>
        </div>
    );
};

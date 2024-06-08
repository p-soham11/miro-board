/** @format */

import Image from "next/image";

export const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Image
                src="/skateloader.gif"
                alt="Loading"
                width={118}
                height={118}
                // className="animate-pulse duration-800"
            />
        </div>
    );
};

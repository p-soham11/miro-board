/** @format */

import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center mt-[-80px]">
            <Image
                src="/search-empty.svg"
                alt="Search is Empty"
                height={380}
                width={380}
            />
            <h2 className="text-2xl font-semibold mt-6">
                🔍 No results found!
            </h2>
            <p className="text-slate-500 text-sm mt-1 pl-7">
                Try searching for something else!
            </p>
        </div>
    );
};

/** @format */

"use client";

import queryString from "query-string";
import { Search } from "lucide-react";
// import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { url } from "inspector";
import { log } from "console";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debounced = useDebounce(value, 500);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const queryParams = { search: debounced };
        const queryStringified = queryString.stringify(queryParams, {
            skipEmptyString: true,
            skipNull: true,
        });
        const url = `/?${queryStringified}`;
        router.push(url);
    }, [debounced, router]);

    return (
        <div className="w-full relative">
            <Search className="absolute top-1 left-5 transform translate-y-1/2" />
            <Input
                className="w-full max-w-[586px] pl-[60px]"
                label="Search Boards"
                onChange={handleInputChange}
                value={value}
            />
        </div>
    );
};

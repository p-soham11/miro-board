/** @format */

"use client";

import queryString from "query-string";
import { Search } from "lucide-react";
// import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@nextui-org/input";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debounced = useDebounce(value, 500);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const queryParams = { search: debounced };
        console.log(queryParams);
        const queryStringified = queryString.stringify(queryParams, {
            skipEmptyString: true,
            skipNull: true,
        });
        const url = `/?${queryStringified}`;
        console.log(url);
        router.push(url);
    }, [debounced, router]);

    return (
        <div className="w-full relative">
            <Search className="absolute left-5 transform translate-y-[6px]" />
            <Input
                className="w-full max-w-[596px] pl-[60px] max-h-[54px] transform translate-y-2 mt-[-18px]"
                label="Search Boards"
                onChange={handleInputChange}
                value={value}
            />
        </div>
    );
};

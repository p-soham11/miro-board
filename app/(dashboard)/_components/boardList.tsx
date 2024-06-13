/** @format */

"use client";

import { EmptyBoards } from "./emptyBoards";
import { EmptyFavrt } from "./emptyFavrt";
import { EmptySearch } from "./emptySearch";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = []; //Change to API Call

    if (!data?.length && query.search) {
        return <EmptySearch />;
    }

    if (!data?.length && query.favourites) {
        return <EmptyFavrt />;
    }

    if (!data?.length) {
        return <EmptyBoards />;
    }

    return <div>{JSON.stringify(query)}</div>;
};

/** @format */

"use client";

import { EmptyBoards } from "./emptyBoards";
import { EmptyFavrt } from "./emptyFavrt";
import { EmptySearch } from "./emptySearch";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./boardCard";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = useQuery(api.boards.get, { orgId });

    // Loading state
    if (data === undefined) {
        return <div>Loading...</div>;
    }

    if (!data?.length && query.search) {
        return <EmptySearch />;
    }

    if (!data?.length && query.favourites) {
        return <EmptyFavrt />;
    }

    if (!data?.length) {
        return <EmptyBoards />;
    }

    return (
        <div>
            {/* {JSON.stringify(data)} */}
            <h2 className="text-3xl">
                {query.favourites ? "Favourite Boards" : "Team Boards"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                {data?.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavourite={false}
                    />
                ))}
            </div>
        </div>
    );
};

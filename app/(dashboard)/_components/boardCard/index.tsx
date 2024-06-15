/** @format */

"use-client";

import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@nextui-org/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
    id: string;
    title: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: number;
    orgId: string;
    isFavourite: boolean;
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavourite,
}: BoardCardProps) => {
    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

    const { mutate: onFavourite, pending: isFavouritePending } = useApiMutation(
        api.board.favourite
    );
    const { mutate: onUnFavourite, pending: isUnFavouritePending } =
        useApiMutation(api.board.unFavourite);

    const toggleFavourite = () => {
        if (isFavourite) {
            onUnFavourite({ id }).catch(() =>
                toast.error("Failed to unfavourite board")
            );
        } else {
            onFavourite({ id, orgId }).catch(() =>
                toast.error("Failed to Favourite board")
            );
        }
    };

    return (
        <Link href={`/board/${id}`}>
            <div className="relative group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-teal-50 flex justify-center items-center">
                    <div
                        style={{
                            width: "65%",
                            height: "55%",
                            position: "relative",
                        }}
                    >
                        <Image
                            src={imageUrl}
                            alt={title}
                            layout="fill"
                            objectFit="contain"
                            className="m-auto"
                        />
                    </div>
                </div>
                <Overlay />
                <Actions id={id} title={title} side="right">
                    <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                        <MoreHorizontal className="text-cyan-50 opacity-75 hover:opacity-100 transition-opacity" />
                    </button>
                </Actions>
                <Footer
                    isFavourite={isFavourite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavourite}
                    disabled={isFavouritePending || isUnFavouritePending}
                />
            </div>
        </Link>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="relative  aspect-[100/127] rounded-lg  justify-between overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    );
};

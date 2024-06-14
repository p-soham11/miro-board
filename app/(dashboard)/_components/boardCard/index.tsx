/** @format */

"use-client";

import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";

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
                <Footer
                    isFavourite={isFavourite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={() => {}}
                    disabled={false}
                />
            </div>
        </Link>
    );
};

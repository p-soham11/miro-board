/** @format */

import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_1avcnS1QhFUUyh-hmLNTgdLFhIRbCHZH9uXQXfvKtxZcklIaIiLpQ_weWfPEaGcv",
});

export async function POST(req: Request) {
    const authorization = await auth();
    const user = await currentUser();

    if (!user || !authorization) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { room } = await req.json();
    const board = await convex.query(api.board.get, { id: room });

    if (board?.orgId !== authorization.orgId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userInfo = {
        name: user.firstName || "Anonymous",
        picture: user.imageUrl,
    };

    const session = liveblocks.prepareSession(user.id, { userInfo });

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new Response(body, { status });
}

/** @format */

import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
    "/placeholders/11.svg",
    "/placeholders/12.svg",
    "/placeholders/13.svg",
    "/placeholders/14.svg",
    "/placeholders/15.svg",
    "/placeholders/16.svg",
    "/placeholders/17.svg",
    "/placeholders/18.svg",
    "/placeholders/19.svg",
    "/placeholders/20.svg",
    "/placeholders/21.svg",
    "/placeholders/22.svg",
    "/placeholders/23.svg",
    "/placeholders/24.svg",
    "/placeholders/25.svg",
    "/placeholders/26.svg",
    "/placeholders/27.svg",
    "/placeholders/28.svg",
    "/placeholders/29.svg",
    "/placeholders/30.svg",
];

export const create = mutation({
    args: { orgId: v.string(), title: v.string() },
    handler: async (ctx, args) => {
        // Do something with `ctx`
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const rndmImg = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            orgId: args.orgId,
            title: args.title,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: rndmImg,
        });

        return board;
    },
});
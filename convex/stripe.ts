/** @format */

"use node";

import Stripe from "stripe";
import { v } from "convex/values";

import { action } from "./_generated/server";

const url = process.env.NEXT_PUBLIC_APP_URL;

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-06-20",
});

export const pay = action({
    args: { orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User is unauthenticated");
        }

        if (!args.orgId) {
            throw new Error("No Organization ID provided");
        }
    },
});

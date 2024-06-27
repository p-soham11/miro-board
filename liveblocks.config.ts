/** @format */

// // Define Liveblocks types for your application
// // https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import {
    createClient,
    LiveList,
    LiveMap,
    LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Layer, Color } from "@/types/canvas";

const client = createClient({
    authEndpoint: "/api/liveblocks-auth",
    throttle: 16,
});

type Presence = {
    cursor: { x: number; y: number } | null;
    selection: string[];
};
type Storage = {
    layers: LiveMap<string, LiveObject<Layer>>;
    layerIds: LiveList<string>;
};
type UserMeta = {
    id?: string;
    info?: {
        name?: string;
        picture?: string;
    };
};
type RoomEvent = {};

export const {
    suspense: {
        RoomProvider,
        useRoom,
        useMyPresence,
        useUpdateMyPresence,
        useSelf,
        useOthers,
        useOthersMapped,
        useOthersConnectionIds,
        useOther,
        useBroadcastEvent,
        useEventListener,
        useErrorListener,
        useStorage,
        useThreads,
        useHistory,
        useUndo,
        useRedo,
        useCanUndo,
        useCanRedo,
        useMutation,
    },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);

// declare global {
//   interface Liveblocks {
//     // Each user's Presence, for useMyPresence, useOthers, etc.
//     Presence: {
//       // Example, real-time cursor coordinates
//       // cursor: { x: number; y: number };
//     };

//     // The Storage tree for the room, for useMutation, useStorage, etc.
//     Storage: {
//       // Example, a conflict-free list
//       // animals: LiveList<string>;
//     };

//     // Custom user info set when authenticating with a secret key
//     UserMeta: {
//       id: string;
//       info: {
//         // Example properties, for useSelf, useUser, useOthers, etc.
//         // name: string;
//         // avatar: string;
//       };
//     };

//     // Custom events, for useBroadcastEvent, useEventListener
//     RoomEvent: {};
//       // Example has two events, using a union
//       // | { type: "PLAY" }
//       // | { type: "REACTION"; emoji: "🔥" };

//     // Custom metadata set on threads, for useThreads, useCreateThread, etc.
//     ThreadMetadata: {
//       // Example, attaching coordinates to a thread
//       // x: number;
//       // y: number;
//     };

//     // Custom room info set with resolveRoomsInfo, for useRoomInfo
//     RoomInfo: {
//       // Example, rooms with a title and url
//       // title: string;
//       // url: string;
//     };
//   }
// }

export {};

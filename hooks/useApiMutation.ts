/** @format */

import { useState } from "react";
import { useMutation } from "convex/react";
import { error } from "console";

export const useApiMutation = (mutation: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutation);

    const mutate = (payload: any) => {
        setPending(true);
        return apiMutation(payload)
            .finally(() => setPending(false))
            .then((res) => {
                return res;
            })
            .catch((error) => {
                throw error;
            });
    };
    return { mutate, pending };
};

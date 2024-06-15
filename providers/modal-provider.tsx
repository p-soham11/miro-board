/** @format */

"use client";

import { useEffect, useState } from "react";
import { RenameModal } from "@/components/modal/renameModal";

export const ModalProvider = () => {
    // To check for Hydration Errors
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <RenameModal />
        </>
    );
};

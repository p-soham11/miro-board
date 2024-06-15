/** @format */

import { create } from "zustand";

const defaultState = { id: "", title: "" };

interface RenameModalStateProps {
    isOpen: boolean;
    initialValues: typeof defaultState;
    onOpen: (id: string, title: string) => void;
    onClose: () => void;
}

export const useRenameModal = create<RenameModalStateProps>((set) => ({
    isOpen: false,
    initialValues: defaultState,
    onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
    onClose: () => set({ isOpen: false, initialValues: defaultState }),
}));

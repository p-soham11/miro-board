/** @format */

import { create } from "zustand";

const defaultState = { id: "", title: "" };

interface IProModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModal = create<IProModal>((set) => ({
    isOpen: false,
    initialValues: defaultState,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

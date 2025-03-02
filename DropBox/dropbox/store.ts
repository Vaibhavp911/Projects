import { create } from "zustand";

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;

    fileId: string | null;
    setFileId: (fileId: string) => void;  

    fileName: string;  
    setFileName: (fileName: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    fileId: null,
    setFileId: (fileId) => set({ fileId }),  

    fileName: "",  
    setFileName: (fileName) => set({ fileName: fileName }),  

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set({ isDeleteModalOpen: open }),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open) => set({ isRenameModalOpen: open }),
}));

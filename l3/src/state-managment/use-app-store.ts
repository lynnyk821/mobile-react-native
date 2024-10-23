import { create } from "zustand";
import { Store } from "../types/Store";

export const useAppStore = create<Store>((set) => ({
    contacts: [
        { id: 1, name: 'Jane Cooper', phone: '(270) 555-0117', image: 'https://via.placeholder.com/40' },
        { id: 2, name: 'Devon Lane', phone: '(308) 555-0121', image: 'https://via.placeholder.com/40' },
    ],
    setContacts: (contacts) => set(() => ({ contacts })),
}));
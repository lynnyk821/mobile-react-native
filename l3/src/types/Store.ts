import {Contact} from "./Contact";

export type Store = {
    contacts: Contact[],
    setContacts: (contacts: Contact[]) => void,
}
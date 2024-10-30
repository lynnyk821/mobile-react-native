import { PhoneContact } from "./PhoneContact";

export type Store = {
    contacts: PhoneContact[],
    setContacts: (contacts: PhoneContact[]) => void,

    contactId: number,
    setContactId: (contactId: number) => void,

    value: number,
    notify: () => void,
}
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { findAllContacts } from "../../../database/repository/contact-repository";
import {useAppStore} from "../../../state-managment/use-app-store";

export const useContacts = () => {
    const db = useSQLiteContext();
    const {value} = useAppStore();
    const [contacts, setContacts] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setError(null);
            try {
                const data = await findAllContacts(db);
                setContacts(data);
            } catch (err) {
                setError("Failed to load contacts.");
            }
        };
        fetchContacts();
    }, [value]);

    return { contacts, error };
};
import {useEffect, useState} from "react";
import {useSQLiteContext} from "expo-sqlite";
import {findContactById} from "../../../database/repository/contact-repository";
import {useAppStore} from "../../../state-managment/use-app-store";

export const useContact = () => {
    const {contactId} = useAppStore();
    const db = useSQLiteContext();
    const [contact, setContact] = useState<any>(null);

    useEffect(() => {
        const getDataFromDB = async () => {
            const data = await findContactById(db, contactId);
            if (!data) return;

            setContact(data);
        };
        getDataFromDB();
    }, []);

    return { contact };
}
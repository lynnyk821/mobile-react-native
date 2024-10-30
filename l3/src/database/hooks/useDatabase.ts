import {startTransition, useEffect, useState} from "react";
import {openDatabaseAsync} from "expo-sqlite";
import {dropTables, tryToCreateTables} from "../repository/contact-repository";

export const useDatabase = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const doAsync = async () => {
            try {
                const db = await openDatabaseAsync('sqlite.db');
                //await dropTables(db);
                await tryToCreateTables(db);

                startTransition(() => setLoaded(true));
            } catch (e) {
                console.error(e);
            }
        }
        doAsync();
    }, []);

    return {loaded};
}
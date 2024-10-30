import React, { useState } from 'react';
import { View } from 'react-native';

import ContactList from "./components/ContactList";
import SearchField from "./components/SearchField";
import {useContacts} from "./hooks/use-contacts";

const ContactsScreen = () => {
    const { contacts } = useContacts();
    const [search, setSearch] = useState('');

    const getHandledContacts = (contacts: any) => {
        if(contacts === null) return;
        return contacts
            .filter((contact: { name: string; }) => contact.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
    }

    return (
        <View className="flex-1 bg-white">
            <View className={"flex-1 p-5"}>
                <SearchField
                    value={search}
                    onChange={setSearch}
                />
                <ContactList contacts={getHandledContacts(contacts)} />
            </View>
        </View>
    );
};

export default ContactsScreen;

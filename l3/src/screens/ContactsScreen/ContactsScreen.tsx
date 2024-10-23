import React, { useState } from 'react';
import { View } from 'react-native';

import ContactList from "./components/ContactList";
import SearchField from "./components/SearchField";
import {useAppStore} from "../../state-managment/use-app-store";

const ContactsScreen = () => {
    const [search, setSearch] = useState('');
    const { contacts } = useAppStore();

    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

    const filteredContacts = sortedContacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View className="flex-1 bg-white p-5">
            <SearchField
                value={search}
                onChange={setSearch}
            />
            <ContactList contacts={filteredContacts}/>
        </View>
    );
};

export default ContactsScreen;

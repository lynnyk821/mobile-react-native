import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, View, TextInput } from "react-native";
import { PhoneContact } from "../../types/PhoneContact";
import { useContact } from "./hooks/use-contact";
import {useNavigation} from "@react-navigation/native";
import {deleteContactById, updateContact} from "../../database/repository/contact-repository";
import {useSQLiteContext} from "expo-sqlite";
import {useAppStore} from "../../state-managment/use-app-store";

export default function ContactScreen() {
    const db = useSQLiteContext();
    const {notify} = useAppStore();

    const { contact } = useContact();
    const navigation = useNavigation();
    const [isPhoneContact, setIsPhoneContact] = useState(false);
    const [name, setName] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    useEffect(() => {
        if (contact && contact[0]) {
            setIsPhoneContact((contact[0] as PhoneContact)?.phone !== null);
            setName(contact[0]?.name || "");
            setContactInfo((contact[0] as PhoneContact).phone || contact[0]?.email || "");
        }
    }, [contact]);

    if (!contact) return null;

    const onSave = async () => {
        isPhoneContact ? await updateContact(db, contact[0].id, {
            name: name,
            phone: contactInfo,
        }) : await updateContact(db, contact[0].id, {
            name: name,
            email: contactInfo,
        })
        notify();
        navigation.navigate("Contacts");
    };

    const onDelete = async () => {
        await deleteContactById(db, contact[0].id);
        notify();
        navigation.navigate("Contacts")
    }

    return (
        <View className="flex-1 p-4 pt-8 bg-gray-100">
            <View className="flex flex-row">
                <View className={"w-1/3 h-44 flex justify-center items-center"}>
                    <TouchableOpacity className="w-32 h-32 rounded-full overflow-hidden">
                        <Image
                            className="w-full h-full"
                            source={{ uri: contact[0]?.image || "https://via.placeholder.com/150" }}
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex-1 px-6">
                    <View>
                        <Text className="text-lg mb-2 text-gray-800">Назва</Text>
                        <TextInput
                            className="h-10 border border-gray-300 rounded px-3 mb-4"
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter the name"
                        />
                    </View>
                    <View>
                        <Text className="text-lg mb-2 text-gray-800">
                            {isPhoneContact ? "Телефон" : "Пошта"}
                        </Text>
                        <TextInput
                            className="h-10 border border-gray-300 rounded px-3 mb-4"
                            value={contactInfo}
                            onChangeText={setContactInfo}
                            placeholder={isPhoneContact ? "Enter the phone number" : "Enter the email"}
                            keyboardType={isPhoneContact ? "phone-pad" : "email-address"}
                        />
                    </View>
                </View>
            </View>
            <View className={"w-full flex pt-10 px-1 flex-row gap-5"}>
                <TouchableOpacity
                    className="w-3/5 mt-2 py-3 bg-blue-500 rounded"
                    onPress={onSave}

                >
                    <Text className="text-white text-lg font-bold text-center">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 mt-2 py-3 bg-red-500 rounded"
                    onPress={onDelete}
                >
                    <Text className="text-white text-lg font-bold text-center">Delete</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

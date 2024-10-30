import { z } from 'zod';
import {useSQLiteContext} from "expo-sqlite";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createContact, saveAllContacts} from "../../database/repository/contact-repository";
import {Text, TouchableOpacity, View} from "react-native";
import {FormInputField} from "../NewContactFormScreen/components/FormInputField";
import React from "react";
import {useAppStore} from "../../state-managment/use-app-store";
import {EmailContact} from "../../types/EmailContact";

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
});

export type FormValues = {
    name: string,
    email: string,
}

export default function NewEmailContactScreen(navigation : any) {
    const db = useSQLiteContext();
    const {notify} = useAppStore();

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const handleSaveToDatabase: SubmitHandler<FormValues> = async (data) => {
        await createContact(db, data);
        notify();
        navigation.navigate("Contacts")
    }

    const uploadEmailContacts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/contacts/email", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch contacts");
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (

        <View className="flex-1 bg-white p-5">
            <FormInputField
                id="name" title="Name"
                placeholder="Enter the name"
                control={control}
                errors={errors}
            />
            <FormInputField
                id="email" title="Email"
                placeholder="Enter the email"
                control={control}
                errors={errors}
            />
            <TouchableOpacity
                className={"w-full mt-3 py-2.5 text-center bg-blue-400"}
                onPress={handleSubmit(handleSaveToDatabase)}
            >
                <Text className={"w-full text-white font-bold text-lg text-center"}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={"w-full mt-3 py-2.5 text-center bg-green-400"}
                onPress={() => uploadEmailContacts}
            >
                <Text className={"w-full text-white font-bold text-lg text-center"}>Upload</Text>

            </TouchableOpacity>
        </View>
    );
};
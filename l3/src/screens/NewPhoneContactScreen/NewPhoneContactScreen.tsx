import { z } from 'zod';
import {useSQLiteContext} from "expo-sqlite";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createContact} from "../../database/repository/contact-repository";
import {Text, TouchableOpacity, View} from "react-native";
import {FormInputField} from "../NewContactFormScreen/components/FormInputField";
import React from "react";
import {useContacts} from "../ContactsScreen/hooks/use-contacts";
import {useAppStore} from "../../state-managment/use-app-store";

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" })
        .regex(/^\d+$/, { message: "Phone number must be numeric" }),
});

export type FormValues = {
    name: string,
    phone: string,
}

export default function NewPhoneContactScreen({navigation} : any) {
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

    return (
        <View className="flex-1 bg-white p-5">
            <FormInputField
                id="name" title="Name"
                placeholder="Enter the name"
                control={control}
                errors={errors}
            />
            <FormInputField
                id="phone" title="Phone"
                placeholder="Enter the phone number"
                control={control}
                errors={errors}
            />
            <TouchableOpacity
                className={"w-full mt-3 py-2.5 text-center bg-blue-400"}
                onPress={handleSubmit(handleSaveToDatabase)}
            >
                <Text className={"w-full text-white font-bold text-lg text-center"}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { FormInputField } from "./components/FormInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../state-managment/use-app-store";
import {PhoneContact} from "../../types/PhoneContact";

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }).regex(/^\d+$/, { message: "Phone number must be numeric" }),
});

export type FormValues = {
    name: string,
    phone: string,
}

const NewContactScreen = () => {
    const { contacts, setContacts } = useAppStore();

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const handleSaveLocal: SubmitHandler<FormValues> = (data) => {
        const newContact: PhoneContact = {
            id: contacts.length + 1,
            image: "https://via.placeholder.com/40",
            ...data,
        };

        setContacts([...contacts, newContact]);
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
                onPress={handleSubmit(handleSaveLocal)}
            >
                <Text className={"w-full text-white font-bold text-lg text-center"}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NewContactScreen;

    // @flow
    import * as React from 'react';
    import {Text, TextInput, View} from "react-native";
    import {Controller} from "react-hook-form";

    type Props = {
        id: string,
        title: string,
        placeholder: string
        control: any,
        errors: any,
    };

    export function FormInputField({ id, title, placeholder, control, errors }: Props) {
        return (
            <View className={"w-full h-24 mb-1.5"}>
                <Text className="text-lg mb-2.5">{title}</Text>
                <Controller
                    name={id}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="h-10 border border-gray-300 rounded px-3 mb-1"
                            placeholder={placeholder}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors[id] && errors[id].message && (
                    <Text className="text-xs text-red-500">{String(errors[id].message)}</Text>
                )}
            </View>
        );
    };
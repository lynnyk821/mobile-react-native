import {TextInput} from "react-native";

type Props = {
    value: string,
    onChange: (value: string) => void,
};

export default function SearchField({ value, onChange }: Props) {
    return (
        <TextInput
            className="h-10 border border-gray-300 rounded-full px-4 mb-4"
            placeholder="Search"
            value={value}
            onChangeText={onChange}
        />
    );
};
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Contact} from "../../../types/Contact";

export default function ContactList({contacts} : {contacts: Contact[]}) {
    return (
        <FlatList
            className={"pr-10"}
            data={contacts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="flex-row items-center py-3 border-b border-gray-200"
                >
                    <Image
                        className="w-10 h-10 rounded-full mr-3"
                        source={{ uri: item.image }}
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-medium">{item.name}</Text>
                        <Text className="text-gray-500">{item.phone}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};
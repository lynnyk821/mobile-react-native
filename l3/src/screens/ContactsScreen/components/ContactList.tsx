import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {PhoneContact} from "../../../types/PhoneContact";
import {EmailContact} from "../../../types/EmailContact";
import {useNavigation} from "@react-navigation/native";
import {useAppStore} from "../../../state-managment/use-app-store";

export default function ContactList({contacts}: {contacts: any}) {
    const { setContactId } = useAppStore();
    const navigation = useNavigation();

    return (
        <FlatList
            className={"pr-10"}
            data={contacts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="flex-row items-center py-3 border-b border-gray-200"
                    onPress={() => {
                        navigation.navigate("Contact")
                        setContactId(item.id)
                    }}
                >
                    <Image
                        className="w-10 h-10 rounded-full mr-3"
                        source={{ uri: item.image }}
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-medium">{item.name}</Text>
                        <Text className="text-gray-500">
                            {item.phone
                                ? "Phone: " + (item as PhoneContact).phone
                                : "Email: " + (item as EmailContact).email}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};
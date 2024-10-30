import { TouchableOpacity, Image, View } from "react-native";

export default function NewContactButtonsBar({ navigation }: { navigation: any }) {
    return (
        <View className={"flex-row"}>
            <TouchableOpacity
                className={"mr-3"}
                onPress={() => navigation.navigate('New Email Contact')}
            >
                <Image
                    className={"w-[26px] h-[26px]"}
                    source={require("../../../assets/app/mail-contact-icon.png")}
                />
            </TouchableOpacity>

            <TouchableOpacity
                className={"mr-3"}
                onPress={() => navigation.navigate('New Phone Contact')}
            >
                <Image
                    className={"w-[26px] h-[26px]"}
                    source={require("../../../assets/app/phone-contact-icon.png")}
                />
            </TouchableOpacity>
        </View>
    )
}

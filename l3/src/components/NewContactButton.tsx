import {TouchableOpacity, Image} from "react-native";

export function NewContactButton({navigation}: {navigation: any }) {
    return (
        <TouchableOpacity
            className={"mr-3"}
            onPress={() => navigation.navigate('NewContact')}
        >
            <Image
                className={"w-[26px] h-[26px]"}
                source={require('../../assets/app/add-icon-3.png')}
            />
        </TouchableOpacity>
    );
};
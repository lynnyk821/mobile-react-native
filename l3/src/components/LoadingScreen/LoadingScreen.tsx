import {ActivityIndicator, View} from "react-native";

const LoadingScreen = () => {
    return (
        <View className={"flex-1 justify-center items-center"}>
            <ActivityIndicator size={48} color={"rgb(22, 163, 74)"}/>
        </View>
    )
}

export default LoadingScreen;
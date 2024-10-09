import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRef, useState } from "react";
import {handlerOnClick} from "./handlers";

export default function App() {
  const value = useRef(0);
  const textColors = ["red", "green", "blue", "purple"];
  const [title, setTitle] = useState<string>(textColors[value.current]);

  return (
    <View className={"h-full w-full flex justify-center items-center"}>
      <Text
          className={"text-3xl m-4"}
          style={[{"color": textColors[value.current]}]}
      >{title}</Text>
      <TouchableOpacity
          className={"p-2 bg-amber-400"}
          onPress={() => handlerOnClick(value, setTitle, textColors)}
      >
        <Text>Click Me!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
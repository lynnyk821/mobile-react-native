import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ContactsScreen from "./src/screens/ContactsScreen/ContactsScreen";
import NewContactScreen from "./src/screens/ContactFormScreen/NewContactScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NewContactButton} from "./src/components/NewContactButton";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Contacts"
                    component={ContactsScreen}
                    options={({ navigation }) => ({
                        title: 'My Contacts',
                        headerRight: () => (<NewContactButton navigation={navigation} />),
                    })}
                />
                <Stack.Screen
                    name="NewContact"
                    component={NewContactScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

import { NavigationContainer } from '@react-navigation/native';
import ContactsScreen from "./src/screens/ContactsScreen/ContactsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewContactButtonsBar  from "./src/components/NewContactButtons/NewContactButtonsBar";
import { Suspense } from "react";
import LoadingScreen from "./src/components/LoadingScreen/LoadingScreen";
import {SQLiteProvider} from "expo-sqlite";
import {useDatabase} from "./src/database/hooks/useDatabase";
import NewEmailContactScreen from "./src/screens/NewEmailContactScreen/NewEmailContactScreen";
import NewPhoneContactScreen from "./src/screens/NewPhoneContactScreen/NewPhoneContactScreen";
import ContactScreen from "./src/screens/ContactByIdScreen/ContactScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    const {loaded} = useDatabase();

    if (!loaded) return <LoadingScreen/>

    return (
        <NavigationContainer>
            <Suspense fallback={<LoadingScreen/>}>
                <SQLiteProvider databaseName={'sqlite.db'} useSuspense>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Contacts"
                            component={ContactsScreen}
                            options={({ navigation }) => ({
                                title: 'My Contacts',
                                headerRight: () => (<NewContactButtonsBar navigation={navigation}/>)
                            })}
                        />
                        <Stack.Screen
                            name="New Phone Contact"
                            component={NewPhoneContactScreen}
                        />
                        <Stack.Screen
                            name="New Email Contact"
                            component={NewEmailContactScreen}
                        />
                        <Stack.Screen
                            name="Contact"
                            component={ContactScreen}
                        />
                    </Stack.Navigator>
                </SQLiteProvider>
            </Suspense>
        </NavigationContainer>
    );
};

export default App;

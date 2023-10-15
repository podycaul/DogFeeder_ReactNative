import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./app/features/home/presentation/screen/HomeScreen";
import FeedScreen from "./app/features/feed/presentation/screen/FeedScreen";
import * as Screens from "./app/features/core/helpers/Screens";
import DogRegistrationScreen from "./app/features/dog_registration/presentation/screen/DogRegistrationScreen";

const Stack = createNativeStackNavigator();

const App: React.FC<{ children: React.ReactNode }> = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name={Screens.DogFeedScreen} component={FeedScreen} />
          <Stack.Screen
            name={Screens.DogRegistrationScreen}
            component={DogRegistrationScreen}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;

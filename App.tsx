import React, { useEffect, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./app/features/home/presentation/screen/HomeScreen";
import FeedScreen from "./app/features/feed/presentation/screen/FeedScreen";
import * as Screens from "./app/features/core/helpers/Screens";
import DogRegistrationScreen from "./app/features/dog_registration/presentation/screen/DogRegistrationScreen";
import { initialize } from "./app/common/data/DataLayer";
import LightTheme from "./Theme";

const Stack = createNativeStackNavigator();

const App: React.FC<{ children: React.ReactNode }> = () => {
  const initializePersistence = useCallback(async () => {
    await initialize();
  }, []);

  useEffect(() => {
    initializePersistence();
  }, []);

  return (
    <NavigationContainer theme={LightTheme}>
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

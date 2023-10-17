import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import RegistrationForm, {
  DogRegistrationFormValues,
} from "../forms/RegistrationForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import useDogRegistrationStorage from "../../hooks/useDogRegistrationStorage";
import * as Screens from "../../../../features/core/helpers/Screens";

interface IDogRegistrationScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const DogRegistrationScreen: React.FC<IDogRegistrationScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { loading, saveDog, updateDog } = useDogRegistrationStorage();

  const handleDogRegistration = async (data: DogRegistrationFormValues) => {
    let dog;
    if (route.params?.dogID) {
      dog = await updateDog({
        id: route.params?.dogID,
        foodScoops: data.scoopCount,
        name: data.dogName,
      });
    } else {
      dog = await saveDog({
        name: data.dogName,
        foodScoops: data.scoopCount,
      });
    }
    // TODO: abstract this android specific toast
    if (dog === null)
      ToastAndroid.show("Failed to save dog!", ToastAndroid.SHORT);
    else navigation.navigate(Screens.Home as never);
  };

  return (
    <View style={[styles.container, loading === true ? styles.centered : null]}>
      {loading === true ? (
        <View style={[styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <RegistrationForm
          onSubmit={handleDogRegistration}
          dogID={route.params?.dogID}
        />
      )}
    </View>
  );
};

export default DogRegistrationScreen;

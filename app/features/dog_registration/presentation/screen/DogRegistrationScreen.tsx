import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import RegistrationForm, {
  DogRegistrationFormValues,
} from "../forms/RegistrationForm";
import { useNavigation } from "@react-navigation/native";
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
  const { loading, saveDog } = useDogRegistrationStorage();

  const handleDogRegistration = async (data: DogRegistrationFormValues) => {
    const dog = await saveDog({
      name: data.dogName,
      foodScoops: data.scoopCount,
    });
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
        <RegistrationForm onSubmit={handleDogRegistration} />
      )}
    </View>
  );
};

export default DogRegistrationScreen;

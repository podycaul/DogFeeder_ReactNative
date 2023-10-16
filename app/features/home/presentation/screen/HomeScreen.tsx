import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "../../../core/presentation/buttons/Button";
import * as Screens from "../../../core/helpers/Screens";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface IHomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        text="Add a dog"
        onPress={() =>
          navigation.navigate(Screens.DogRegistrationScreen as never)
        }
      />
      <Button
        text="Feed the puppers"
        onPress={() => navigation.navigate(Screens.DogFeedScreen as never)}
      />
    </View>
  );
};

export default HomeScreen;

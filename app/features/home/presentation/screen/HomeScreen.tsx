import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../../../core/presentation/buttons/Button";
import * as Screens from "../../../core/helpers/Screens";
import { useNavigation } from "@react-navigation/native";
import DogList from "../../../dog_list/presentation/widget/DogList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  dogList: {
    height: "25%",
    flex: 1,
  },
});

interface IHomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <DogList style={styles.dogList} headerText="My Dogs" />
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
    </View>
  );
};

export default HomeScreen;

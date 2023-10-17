import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import ActionButton from "../../../core/presentation/buttons/Button";

export type DogFeedItemType = {
  id: number;
  name: string;
  numberOfScoops: number;
};

const makeStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingBottm: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  name: {
    fontSize: 20,
  },
  fedButton: {
    backgroundColor: "green",
  },
});

interface IDogFeedItemProps {
  dog: DogFeedItemType;
}

const DogFeedItem: React.FC<IDogFeedItemProps> = ({ dog }) => {
  const style = makeStyle;
  const [hasBeenFed, setHasBeenFed] = useState(false);

  const handleFeed = () => {
    if (hasBeenFed) {
      Alert.alert(
        "Chonk Warning!",
        `You've already fed ${dog.name}. Are you sure you want to feed them again?`,
        [
          {
            text: "Yes",
            onPress: () => {
              console.log("YOU NEED TO CALL THE PICO");
            },
          },
          {
            text: "No",
            style: "cancel",
          },
        ]
      );
    }
    // TODO: call out to the pico
    setHasBeenFed(true);
  };

  return (
    <View style={style.container}>
      <Text style={style.name}>{dog.name}</Text>
      <ActionButton
        style={[hasBeenFed ? style.fedButton : undefined]}
        text={`Feed ${dog.numberOfScoops} scoops`}
        onPress={handleFeed}
      />
    </View>
  );
};

export default DogFeedItem;

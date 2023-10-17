import React from "react";
import { Text, View } from "react-native";
import DogFeedList from "../widget/DogFeedList";

const FeedScreen: React.FC<{}> = () => {
  return (
    <View>
      <DogFeedList />
    </View>
  );
};

export default FeedScreen;

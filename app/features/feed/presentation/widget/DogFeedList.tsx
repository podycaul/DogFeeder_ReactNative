import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import useDogs from "../../hooks/useDogs";
import DogFeedItem, { DogFeedItemType } from "./DogFeedItem";

const sortAlphabetically = (dogA: Dog, dogB: Dog) => {
  if (dogA.name < dogB.name) {
    return -1;
  }
  if (dogA.name > dogB.name) {
    return 1;
  }
  return 0;
};

const EmptyList: React.FC = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontWeight: "bold" }}>No Dogs Registered</Text>
    </View>
  );
};

const makeStyle = StyleSheet.create({
  list: {},
  listHeader: {
    fontSize: 30,
    textAlign: "center",
  },
});

interface IDogFeedListProps {}

const DogFeedList: React.FC<IDogFeedListProps> = () => {
  const style = makeStyle;

  const { loading, dogs } = useDogs();

  const mapDogs = useCallback((): DogFeedItemType[] => {
    if (!dogs) return [];
    return dogs.sort(sortAlphabetically).map(({ id, name, foodScoops }) => {
      return { id: id as number, name, numberOfScoops: foodScoops };
    });
  }, [dogs]);

  if (loading === true) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      style={[style.list]}
      ListHeaderComponent={() => (
        <Text style={style.listHeader}>Dogs to Feed</Text>
      )}
      ListEmptyComponent={EmptyList}
      data={mapDogs()}
      renderItem={({ item }) => <DogFeedItem key={item.id} dog={item} />}
    />
  );
};

export default DogFeedList;

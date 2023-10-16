import React, { useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ToastAndroid,
  Alert,
} from "react-native";
import { useDogList } from "../../hooks/useDogList";
import DogListItem from "./DogListItem";
import { useNavigation } from "@react-navigation/native";
import * as Screens from "../../../core/helpers/Screens";

const makeStyle = StyleSheet.create({
  container: {},
  list: {
    flexGrow: 0,
  },
  listHeader: {
    fontSize: 30,
    textAlign: "center",
  },
  listItem: {},
});

interface IDogListProps {
  style?: object;
  headerText: string;
}

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

const DogList: React.FC<IDogListProps> = ({ style, headerText }) => {
  const internalStyle = makeStyle;
  const navigation = useNavigation();
  const { dogs, deleteDog } = useDogList();

  const mapDogs = useCallback(() => {
    if (!dogs) return [];
    return dogs.sort(sortAlphabetically).map(({ id, name, foodScoops }) => {
      return {
        id,
        name,
        scoopCount: foodScoops,
      };
    });
  }, [dogs]);

  const handleDelete = async (dogID: number) => {
    const dog = dogs?.find((x) => x.id === dogID);
    Alert.alert("Attention", `Are you sure you want to delete ${dog?.name}?`, [
      {
        text: "Yes",
        onPress: async () => {
          if (!(await deleteDog(dogID)))
            ToastAndroid.show("Failed to delete dog!", ToastAndroid.SHORT);
        },
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  const handleEdit = (dogID: number) => {
    navigation.navigate(Screens.DogRegistrationScreen, {
      dogID,
    });
  };

  return (
    <View style={[internalStyle.container, style]}>
      <FlatList
        style={[internalStyle.list]}
        ListHeaderComponent={() => (
          <Text style={internalStyle.listHeader}>{headerText}</Text>
        )}
        ListEmptyComponent={EmptyList}
        data={mapDogs()}
        renderItem={({ item }) => (
          <DogListItem
            key={item.id}
            dog={item}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item.id)}
          />
        )}
      />
    </View>
  );
};

export default DogList;

import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

type DogListItemType = {
  id: number;
  name: string;
  scoopCount: number;
};

const makeStyle = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottm: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  listItemText: {
    fontSize: 20,
  },
});

interface IDogListItemProps {
  dog: DogListItemType;
  onDelete?: (event: GestureResponderEvent) => void;
  onEdit?: (event: GestureResponderEvent) => void;
}

const DogListItem: React.FC<IDogListItemProps> = ({
  dog,
  onDelete,
  onEdit,
}) => {
  const style = makeStyle;

  return (
    <View style={[style.listItemContainer]}>
      <Text style={[style.listItemText]}>{dog.name}</Text>
      <Text style={[style.listItemText]}>{dog.scoopCount}</Text>
      <Icon raised name="edit" onPress={onEdit} />
      <Icon raised name="delete" onPress={onDelete} />
    </View>
  );
};

export default DogListItem;

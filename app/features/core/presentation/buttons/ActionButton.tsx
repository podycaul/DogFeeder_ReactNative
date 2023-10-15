import React from "react";
import { Button, GestureResponderEvent } from "react-native";

const ActionButton: React.FC<IActionButtonProps> = ({ text, onPress }) => {
  return <Button title={text} onPress={onPress} />;
};

export default ActionButton;

interface IActionButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

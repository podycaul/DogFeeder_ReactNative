import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Pressable,
  GestureResponderEvent,
  Text,
  StyleSheet,
} from "react-native";

const makeStyles = ({ colors }: any) =>
  StyleSheet.create({
    button: {
      margin: 10,
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.primary,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });

const Button: React.FC<IButtonProps> = ({ style, text, onPress }) => {
  const theme = useTheme();
  const internalStyle = makeStyles(theme);

  return (
    <Pressable style={[internalStyle.button, style]} onPress={onPress}>
      <Text style={internalStyle.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

interface IButtonProps {
  style?: object;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

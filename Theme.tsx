import { DefaultTheme } from "@react-navigation/native";

// TODO: this doesn't work
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
  },
};

export default LightTheme;

import React from "react";
import { useTheme } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Text, StyleSheet, View, TextInput } from "react-native";
import Button from "../../../core/presentation/buttons/Button";
import Validation from "./Validation";

interface IRegistrationFormProps {
  onSubmit: (event: DogRegistrationFormValues) => void;
}

export type DogRegistrationFormValues = {
  dogName: string;
  scoopCount: number;
};

const makeStyles = (_theme: any) =>
  StyleSheet.create({
    container: {
      margin: 10,
    },
    label: {},
    input: {
      margin: 10,
      fontSize: 20,
    },
  });

const RegistrationForm: React.FC<IRegistrationFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { handleSubmit, control } = useForm<DogRegistrationFormValues>({
    resolver: Validation,
  });

  const onSave = (data: DogRegistrationFormValues) => {
    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>Dog Name</Text>
      <Controller
        name={"dogName" as never}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      <Text style={[styles.label]}># of scoops</Text>
      <Controller
        name={"scoopCount" as never}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      <Button text="Save" onPress={handleSubmit(onSave)} />
    </View>
  );
};

RegistrationForm.defaultProps = {
  onSubmit: () => {},
};

export default RegistrationForm;

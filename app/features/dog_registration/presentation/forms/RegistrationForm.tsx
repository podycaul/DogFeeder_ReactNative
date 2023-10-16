import React, { useEffect, useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Text, StyleSheet, View, TextInput, ToastAndroid } from "react-native";
import Button from "../../../core/presentation/buttons/Button";
import Validation from "./Validation";
import useDogRegistrationStorage from "../../hooks/useDogRegistrationStorage";

interface IRegistrationFormProps {
  onSubmit: (event: DogRegistrationFormValues) => void;
  dogID: number | undefined;
}

export type DogRegistrationFormValues = {
  id?: number;
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

const RegistrationForm: React.FC<IRegistrationFormProps> = ({
  onSubmit,
  dogID,
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { getDog } = useDogRegistrationStorage();

  const { handleSubmit, control, reset } = useForm<DogRegistrationFormValues>({
    resolver: Validation,
    defaultValues: useMemo(() => {
      return {};
    }, [dogID]),
  });

  const onSave = (data: DogRegistrationFormValues) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (dogID) {
      getDog(dogID)
        .then((dog) => {
          console.log("found dog: ", dog);
          reset({
            id: dog?.id,
            scoopCount: dog?.foodScoops,
            dogName: dog?.name,
          });
        })
        .catch(() =>
          ToastAndroid.show("Failed to retrieve dog", ToastAndroid.SHORT)
        );
    }
  }, [dogID]);

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
            value={value?.toString()}
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

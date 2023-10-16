import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DogRegistrationFormValues } from "./RegistrationForm";

export default yupResolver<DogRegistrationFormValues>(
  yup.object().shape({
    dogName: yup.string().required(),
    scoopCount: yup.number().positive(),
  })
);

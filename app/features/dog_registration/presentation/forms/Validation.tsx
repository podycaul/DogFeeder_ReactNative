import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default yupResolver<any>(
  yup.object().shape({
    dogName: yup.string().required(),
    scoopCount: yup.number().positive(),
  })
);

import * as yup from "yup";

export const infoCategorySchema = yup.object().shape({
    title: yup.string().required("Champ requis"),
    color: yup.string().required("Champ requis")
})
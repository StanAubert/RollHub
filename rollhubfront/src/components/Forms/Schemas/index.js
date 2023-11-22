import * as yup from "yup";

export const infoCategorySchema = yup.object().shape({
    title: yup.string().required("Champ requis"),
    color: yup.string().required("Champ requis")
})

export const infoSchema = yup.object().shape({
    title: yup.string().required("Champ requis"),
    content: yup.string().required("Champ requis"),
    categories: yup.array()
})

export const spotSchema = yup.object().shape({
    name: yup.string().required("Champ requis"),
    latitude: yup.string().required("Champ requis"),
    longitude: yup.string().required("Champ requis"),
})

export const userSchema = yup.object().shape({
    pseudo: yup.string().required("Champ requis"),
    email: yup.string().email("Veuillez entrer un email valide").required("Champ requis"),
    firstName: yup.string(),
    lastName: yup.string(),
})
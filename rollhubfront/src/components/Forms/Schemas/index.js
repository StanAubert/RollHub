import * as yup from "yup";

export const infoCategorySchema = yup.object().shape({
    title: yup.string().required("Champ requis"),
    color: yup.string().required("Champ requis")
})

export const infoSchema = yup.object().shape({
    title: yup.string().required("Champ requis"),
    content: yup.string().required("Champ requis"),
    category: yup.string()
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

const passWordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/
const passText = "le mot de passe doit contenir min. 6 caractères, 1 chiffre et 1 caractère spécial"
export const registerSchema = yup.object().shape({
    pseudo: yup.string().required("Champ requis"),
    email: yup.string().email("Veuillez entrer un email valide").required("Champ requis"),
    password: yup.string().min(6)
        .matches(passWordRules, passText)
        .required("Champ requis"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Les mots de passes doivent correspondre").required("Champ requis"),
})

export const loginSchema = yup.object().shape({
    email: yup.string().email("Veuillez entrer un email valide").required("L'email est nécessaire"),
    password: yup.string().required("Le mot de passe est nécessaire"),
})

export const addSpotSchema = yup.object().shape({
    name: yup.string().required("Le nom est nécessaire")
})
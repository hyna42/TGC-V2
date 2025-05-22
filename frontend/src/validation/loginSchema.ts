import { object, string } from "yup";

export const loginSchema = object().shape({
  email: string().email("Email invalide").required("L'email est obligatoire"),
  password: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
});

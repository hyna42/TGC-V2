
import { object, string } from "yup";

export const signupSchema = object().shape({
  email: string().email("Email invalide").required("L'email est obligatoire"),
  hashedPassword: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
});
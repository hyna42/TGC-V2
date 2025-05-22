import { object, string } from "yup";

export const signupSchema = object().shape({
  name: string()
    .min(4, "Le nom doit contenir au moins 4 caractères")
    .required("Le nom est obligatoire"),
  email: string().email("Email invalide").required("L'email est obligatoire"),
  hashedPassword: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
});

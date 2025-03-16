import { array, number, object, string } from "yup";

export const validate = object().shape({
  title: string()
    .required("Le titre est obligatoire")
    .min(3, "Minimum 3 caractères pour le titre")
    .max(50, "Maximum 50 caractères pour le titre"),
  description: string()
    .required("La description est obligatoire")
    .min(10, "Minimum 10 caractères pour la description"),
  owner: string()
    .required("L'auteur est obligatoire")
    .min(3, "L'auteur doit contenir au moins 3 caractères"),
  price: number()
    .required("Le prix est obligatoire")
    .typeError("Le prix doit être un nombre positif")
    .min(0, "Le prix ne peut pas être négatif"),
  location: string()
    .required("La localisation est obligatoire")
    .min(3, "La localisation doit contenir au moins 3 caractères")
    .max(100, "La localisation ne peut pas dépasser 100 caractères"),
  // createdAt: string()
  //   .required("La date de création est obligatoire")
  //   .typeError("La date doit être valide"),
  pictures: array()
    .of(
      object().shape({
        url: string()
          .url("L'URL de l'image doit être valide")
          .required("Une URL est obligatoire"),
      })
    )
    .required("Les images sont obligatoires")
    .min(1, "Au moins une image est obligatoire"),
  category: number()
    .required("La catégorie est obligatoire")
    .typeError("Veuillez sélectionner une catégorie valide"),

  tags: array()
    // .of(number().required("Chaque tag doit être un nombre valide"))
    .min(1, "Vous devez sélectionner au moins un tag")
    .required("Les tags sont obligatoires"),
});

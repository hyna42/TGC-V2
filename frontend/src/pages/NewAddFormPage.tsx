// import React from "react";
import axios from "axios";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
// import { AdFormProps } from "../components/AdCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { validate } from "../validation/validate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreateNewAdMutation,
  useGetAllCategoriesAndTagsQuery,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";

export type Category = {
  id: number;
  title: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type FormPayload = {
  title: string;
  description: string;
  owner: string;
  price: number;
  location: string;
  // createdAt: string; //format ISO
  pictures: { url: string }[]; // Tableau d'URLs d'images
  category: number; // ID de la catégorie
  tags: number[]; // Tableau d'IDs de tags
};

const NewAddFormPage = () => {
  const navigate = useNavigate();

  const { data: getAllCategoriesAndTags } = useGetAllCategoriesAndTagsQuery();

  const [createNewAd] = useCreateNewAdMutation();

  /************gestion du formulaire****************/
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // reset,
  } = useForm<FormPayload>({
    defaultValues: {
      title: "Titre par défaut",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, iusto!
            Voluptates repudiandae asperiores quia. Blanditiis repellat minima
            adipisci, aliquam nulla unde quam architecto eligendi, voluptatum,
            perspiciatis laudantium sed eos voluptates?`,
      owner: "auteur",
      price: 100,
      location: "Paris",
      // createdAt: "1992-04-24",
      pictures: [{ url: "" }],
      tags: [],
    },
    resolver: yupResolver(validate),
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const onSubmit: SubmitHandler<FormPayload> = async (formData) => {
    //préparer le payload

    console.log("formData ", formData);

    const dataPayload = {
      title: formData.title,
      description: formData.description,
      owner: formData.owner,
      price: Number(formData.price), 
      location: formData.location,
      tagIds: formData.tags.map((tag) => parseInt(tag.toString(), 10)),
      categoryId: parseInt(formData.category.toString(), 10), 
      pictures: formData.pictures.map((picture) => picture.url), 
    };

    console.log("payload ", dataPayload);

    await createNewAd({
      variables: { data: dataPayload },
      onCompleted: () => {
        toast.success("Annonce crée avec"), navigate("/");
      },

      onError: (error) => {
        toast.error("Error dans la tentative de création de l'annonce"),
          console.error("Error creation annonce", error);
      },
      refetchQueries: [{ query: GET_ALL_ADS }],
    });
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-content">
        {/* Titre */}
        <div className="form-group">
          <label>Titre</label>
          <input {...register("title")} className="text-field" />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        {/* description */}
        <div className="form-group">
          <label>Description</label>
          <input {...register("description")} className="text-field" />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        {/*Auteur */}
        <div className="form-group">
          <label>Auteur</label>
          <input {...register("owner")} className="text-field" />
          {errors.owner && (
            <span className="error-message">{errors.owner.message}</span>
          )}
        </div>

        {/* Prix */}
        <div className="form-group">
          <label>Prix</label>
          <input {...register("price")} className="text-field" type="number" />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
        </div>

        {/* Localisation */}
        <div className="form-group">
          <label>Localisation</label>
          <input {...register("location")} className="text-field" />
          {errors.location && (
            <span className="error-message">{errors.location.message}</span>
          )}
        </div>

        {/* Photo */}
        <div className="form-group">
          <button
            type="button"
            onClick={() => append({ url: "" })}
            className="text-field button"
          >
            Ajouter une photo
          </button>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`pictures.${index}.url`)}
                className="text-field"
              />
              <button type="button" onClick={() => remove(index)}>
                Supprimer une photo
              </button>
              {/* Affichage des erreurs spécifiques pour ce champ */}
              {errors.pictures?.[index]?.url && (
                <span className="error-message">
                  {errors.pictures[index]?.url?.message}
                </span>
              )}
            </div>
          ))}
          {errors.pictures && (
            <span className="error-message">{errors.pictures.message}</span>
          )}
        </div>

        {/* Catégories */}
        <div className="form-group">
          <label>Catégories</label>
          <select {...register("category")} className="text-field">
            <option value="">...</option>
            {getAllCategoriesAndTags?.getAllCategories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-message">{errors.category.message}</span>
          )}
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {getAllCategoriesAndTags?.getAllTags.map((tag) => (
              <div key={tag.id} className="tag-item">
                <input
                  type="checkbox"
                  value={tag.id}
                  id={`tag-${tag.id}`}
                  {...register("tags")}
                />
                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
          </div>
          {errors.tags && (
            <span className="error-message">{errors.tags.message}</span>
          )}
        </div>

        <input type="submit" className="button" />
      </form>
    </div>
  );
};

export default NewAddFormPage;

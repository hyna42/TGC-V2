// import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
// import { AdFormProps } from "../components/AdCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { validate } from "../validation/validate";

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
  createdAt: string; //format ISO
  pictures: { url: string }[]; // Tableau d'URLs d'images
  category: number; // ID de la catégorie
  tags: number[]; // Tableau d'IDs de tags
};

const NewAddFormPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    //Récupérer les catégories
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:3000/categories"
        );
        if (response.data) setCategories(response.data);
        //   console.log("categories",categories);
      } catch (error) {
        console.log("error fetching categories", error);
      }
    };

    //Récupérer les tags
    const fetchTags = async () => {
      try {
        const response = await axios.get<Tag[]>("http://localhost:3000/tags");
        if (response.data) setTags(response.data);
        //   console.log("categories",categories);
      } catch (error) {
        console.log("error fetching tags", error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  console.log("categories : ", categories);
  console.log("tags : ", tags);

  /************gestion du formulaire****************/
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormPayload>({
    defaultValues: {
      title: "Titre par défaut",
      description: "description",
      owner: "auteur",
      price: 0,
      location: "Paris",
      createdAt: "",
      pictures: [{ url: "" }],
      category: 0,
      tags: [],
    },
    resolver: yupResolver(validate),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const onSubmit: SubmitHandler<FormPayload> = async (formData) => {
    //préparer le payload

    console.log("formData ", formData);

    const dataPayload = {
      ...formData,
      createdAt: new Date(formData.createdAt).toISOString(), //Date
      tags: formData.tags.map(Number), //number[]
      category: Number(formData.category), //number
      // pictures: formData.pictures, //string[]
    };
    console.log("payload ", dataPayload);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Titre</label>
          <input {...register("title")} className="text-field" />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <input {...register("description")} className="text-field" />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Auteur</label>
          <input {...register("owner")} className="text-field" />
          {errors.owner && (
            <span className="error-message">{errors.owner.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Prix</label>
          <input {...register("price")} className="text-field" type="number" />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Localisation</label>
          <input {...register("location")} className="text-field" />
          {errors.location && (
            <span className="error-message">{errors.location.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Date de création</label>
          <input
            {...register("createdAt")}
            className="text-field"
            type="date"
          />
          {errors.createdAt && (
            <span className="error-message">{errors.createdAt.message}</span>
          )}
        </div>

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

        <div className="form-group">
          <label>Catégories</label>
          <select {...register("category")} className="text-field">
            <option value="">...</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-message">{errors.category.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {tags.map((tag) => (
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
    </>
  );
};

export default NewAddFormPage;

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
import { useState } from "react";
import { useIsLoggedIn } from "../utils/user";
import { API_URL } from "../utils/config";

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
  console.log("API_URL ==>", API_URL);
  const navigate = useNavigate();
  const { data: getAllCategoriesAndTags } = useGetAllCategoriesAndTagsQuery();
  const [createNewAd] = useCreateNewAdMutation();

  const authorName = useIsLoggedIn().name || "";
  // ✅ État pour stocker les URL de prévisualisation
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  /************gestion du formulaire****************/
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // reset,
    setValue,
  } = useForm<FormPayload>({
    defaultValues: {
      title: "Titre par défaut",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, iusto!
            Voluptates repudiandae asperiores quia. Blanditiis repellat minima
            adipisci, aliquam nulla unde quam architecto eligendi, voluptatum,
            perspiciatis laudantium sed eos voluptates?`,
      // owner: "auteur",
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
    console.log("formData ", formData);

    const dataPayload = {
      title: formData.title,
      description: formData.description,
      owner: authorName,
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
        toast.success("Annonce crée avec");
        navigate("/");
      },

      onError: (error) => {
        toast.error("Error dans la tentative de création de l'annonce");
        console.error("Error creation annonce", error);
      },
      refetchQueries: [{ query: GET_ALL_ADS }],
    });
  };

  const handleChangeImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    // ✅ Création d'une prévisualisation instantanée
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews[index] = previewUrl;
      return updatedPreviews;
    });

    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFormats.includes(file.type)) {
      toast.error("Formats autorisés : jpg, jpeg, et png");
      throw new Error("Format autorisé : jpg, jpeg, et png");
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/img`, formData);
      if (!response.data.filename) return;
      // Mettre à jour le champ correspondant dans le formulaire
      console.log("filename ==>", response.data.filename);
      console.log("API_URL ==>", API_URL);
      setValue(`pictures.${index}.url`, response.data.filename);
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image", error);
    }
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
          <input
            {...register("owner")}
            className="text-field"
            value={authorName}
            // disabled
          />
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

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {fields.map((field, index) => (
              <div key={field.id} style={{ position: "relative" }}>
                {/* Input fichier caché si l'image est déjà uploadée */}
                {!previewUrls[index] && (
                  <input
                    type="file"
                    onChange={(e) => handleChangeImg(e, index)}
                    style={{ display: "block" }}
                  />
                )}

                {/* Prévisualisation de l'image */}
                {previewUrls[index] && (
                  <div
                    style={{
                      width: "100px",
                      height: "150px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      position: "relative",
                    }}
                  >
                    <img
                      src={previewUrls[index]}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />

                    {/* Bouton de suppression */}
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                        setPreviewUrls((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "2px 8px",
                        fontSize: "12px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                )}

                {/* Affichage des erreurs */}
                {errors.pictures?.[index]?.url && (
                  <span className="error-message">
                    {errors.pictures[index]?.url?.message}
                  </span>
                )}
              </div>
            ))}
          </div>

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

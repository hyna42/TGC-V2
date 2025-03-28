// import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import {
  useGetAdByIdQuery,
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
  useUpdateAdMutation,
} from "../generated/graphql-types";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { GET_ALL_ADS } from "../graphql/queries";
import axios from "axios";

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

export type Category = {
  id: number;
  title: string;
};

export type Tag = {
  id: number;
  name: string;
};

const UpdateAdPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id as string) },
  });
  const fetchAdDetails = data?.getAdById;
  console.log("fetchAdDetails", fetchAdDetails);

  const { data: fetchCategories } = useGetAllCategoriesQuery();
  const allCategories = fetchCategories?.getAllCategories || [];

  const { data: fetchTags } = useGetAllTagsQuery();
  const allTags = fetchTags?.getAllTags || [];

  const [updateAd] = useUpdateAdMutation();
  // console.log('tag',allTags)
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormPayload>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  useEffect(() => {
    if (fetchAdDetails) {
      setValue("title", fetchAdDetails.title);
      setValue("description", fetchAdDetails.description);
      setValue("price", fetchAdDetails.price);
      setValue("location", fetchAdDetails.location);
      setValue("createdAt", fetchAdDetails.createdAt.split("T")[0]);
      setValue("category", fetchAdDetails.category.id);
      setValue(
        "pictures",
        fetchAdDetails.pictures?.map((pic) => ({ url: pic.url })) || []
      );
      setPreviewUrls(fetchAdDetails.pictures?.map((pic) => pic.url) || []);
    }
  }, [fetchAdDetails, setValue]);

  const handleChangeImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFormats.includes(file.type)) {
      toast.error("Formats autorisés : jpg, jpeg, et png");
      throw new Error("Format autorisé : jpg, jpeg, et png");
    }

    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews[index] = previewUrl;
      return updatedPreviews;
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/img", formData);
      if (!response.data.filename) return;
      setValue(`pictures.${index}.url`, response.data.filename);
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image", error);
    }
  };

  const onSubmit: SubmitHandler<FormPayload> = async (formData) => {
    //préparer le payload

    console.log("formData ", formData);

    const dataPayload = {
      id: Number(id),
      title: formData.title,
      description: formData.description,
      owner: formData.owner,
      price: Number(formData.price),
      location: formData.location,
      createdAt: new Date(formData.createdAt).toISOString(),
      categoryId: Number(formData.category),
      tagIds: formData.tags.map(Number),
      pictures: formData.pictures.map((pic) => pic.url),
    };

    await updateAd({
      variables: { data: dataPayload },
      onCompleted: (response) => {
        console.log("annonce modifié avec succès", response);
        toast.success("Annonce modifiée avec succès");
        navigate("/");
      },
      onError: (errors) => {
        console.error(
          "Error dans la tentative de modification de l'annonce",
          errors
        );
        toast.error("Une erreur est survenue");
      },
      refetchQueries: [{ query: GET_ALL_ADS }],
    });
    console.log("payload ", dataPayload);
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-content">
        {/* titre */}
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input {...register("title")} id="title" className="text-field" />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        {/* description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            {...register("description")}
            id="description"
            className="text-field"
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        {/* prix */}
        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <input
            {...register("price")}
            id="price"
            className="text-field"
            type="number"
          />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
        </div>

        {/* localisation */}
        <div className="form-group">
          <label htmlFor="location">Localisation</label>
          <input
            {...register("location")}
            id="location"
            className="text-field"
          />
          {errors.location && (
            <span className="error-message">{errors.location.message}</span>
          )}
        </div>

        {/* date de creation */}
        <div className="form-group">
          <label htmlFor="createdAt">Date de création</label>
          <input
            {...register("createdAt")}
            id="createdAt"
            className="text-field"
            type="date"
          />
          {errors.createdAt && (
            <span className="error-message">{errors.createdAt.message}</span>
          )}
        </div>

        {/* photo */}
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
              <div
                key={field.id}
                style={{
                  width: "100px",
                  height: "150px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                {!previewUrls[index] && (
                  <input
                    type="file"
                    onChange={(e) => handleChangeImg(e, index)}
                    style={{ display: "block" }}
                  />
                )}
                {previewUrls[index] && (
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
                )}
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
            ))}
          </div>
        </div>

        {/* catégories */}
        <div className="form-group">
          <label htmlFor="category">Catégories</label>
          <select
            {...register("category")}
            id="category"
            className="text-field"
            defaultValue={fetchAdDetails?.category.id}
          >
            <option value="" disabled>
              Sélectionner une catégorie...
            </option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-message">{errors.category.message}</span>
          )}
        </div>

        {/* tags */}

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {allTags.map((tag) => (
              <div key={tag.id} className="tag-item">
                <input
                  type="checkbox"
                  value={tag.id}
                  id={`tag-${tag.id}`}
                  {...register("tags")}
                  defaultChecked={fetchAdDetails?.tags
                    ?.map((adTag) => adTag.id)
                    .includes(tag.id)}
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

export default UpdateAdPage;

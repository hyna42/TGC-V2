// import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import {
  useGetAdByIdQuery,
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
} from "../generated/graphql-types";
import { useParams } from "react-router-dom";

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

export type AdDetailsType = {
  title: string;
  description: string;
  owner: string;
  price: number;
  location: string;
  createdAt: string; //format ISO
  // pictures: string[];
  pictures: { url: string }[]; // Tableau d'URLs d'images
  // category: number; // ID de la catégorie
  category: { id: number; title: string };

  tags: { id: number; name: string }[]; // Tableau d'IDs de tags
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
  // const navigate = useNavigate();
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState<AdDetailsType | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const { data } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id as string) },
  });
  const fetchAdDetails = data?.getAdById;
  console.log("fetchAdDetails", fetchAdDetails);

  const { data: fetchCategories } = useGetAllCategoriesQuery();
  const allCategories = fetchCategories?.getAllCategories || [];

  const { data: fetchTags } = useGetAllTagsQuery();
  const allTags = fetchTags?.getAllTags || [];

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get<AdDetailsType>(
          `http://localhost:3000/ads/${id}`
        );

        // ** Conversion des pictures pour garantir le bon format { url: string } **
        const formattedPictures = response.data.pictures.map((picture) =>
          typeof picture === "string" ? { url: picture } : picture
        );

        // 🔥 Extraire la date au format "aaaa-mm-jj"
        const formattedDate = response.data.createdAt.slice(0, 10);

        // On remplace l'ancien tableau de strings par le format attendu
        setAdDetails({
          ...response.data,
          pictures: formattedPictures,
          createdAt: formattedDate,
        });
      } catch (error) {
        console.log(
          "Erreur dans la tentative de récupératon des détails de l'annonce",
          error
        );
      }
    };
    fetchAdDetails();
  }, [id]);

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

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormPayload>();

  useEffect(() => {
    if (adDetails) {
      reset({
        ...adDetails,
        category: adDetails.category.id,
        tags: adDetails.tags.map((tag) => tag.id),
      });
    }
  }, [adDetails, reset]);

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
      pictures: formData.pictures.map((picture) => picture.url), //string[]
    };

    console.log("payload ", dataPayload);
    // try {
    //   await axios.put<FormPayload[]>(
    //     `http://localhost:3000/ads/${id}`,
    //     dataPayload
    //   );

    //   toast.success("🚀 Votre annonce a été modifiée avec succès !");
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error create ad", error);
    //   toast.error(
    //     "Une erreur est survenue lors de la modification de l'annonce"
    //   );
    // }
  };

  //logs
  // console.log("id", id);
  // console.log("AdDetails Update  ==> ", adDetails);
  useEffect(() => {
    if (fetchAdDetails?.category?.id) {
      setValue("category", fetchAdDetails.category.id);
    }
  }, [fetchAdDetails, setValue]);

  useEffect(() => {
    if (fetchAdDetails?.tags) {
      setValue(
        "tags",
        fetchAdDetails.tags.map((tag) => tag.id)
      );
    }
  }, [fetchAdDetails, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            {...register("title")}
            id="title"
            className="text-field"
            defaultValue={fetchAdDetails?.title}
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            {...register("description")}
            id="description"
            className="text-field"
            defaultValue={fetchAdDetails?.description}
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="owner">Auteur</label>
          <input
            {...register("owner")}
            id="owner"
            className="text-field"
            defaultValue={fetchAdDetails?.owner}
          />
          {errors.owner && (
            <span className="error-message">{errors.owner.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <input
            {...register("price")}
            id="price"
            className="text-field"
            type="number"
            defaultValue={fetchAdDetails?.price}
          />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location">Localisation</label>
          <input
            {...register("location")}
            id="location"
            className="text-field"
            defaultValue={fetchAdDetails?.location}
          />
          {errors.location && (
            <span className="error-message">{errors.location.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="createdAt">Date de création</label>
          <input
            {...register("createdAt")}
            id="createdAt"
            className="text-field"
            type="date"
            defaultValue={fetchAdDetails?.createdAt?.split("T")[0]}
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
                id={`picture-${index}`}
                className="text-field"
                defaultValue={fetchAdDetails?.pictures?.[index]?.url}
              />
              <button type="button" onClick={() => remove(index)}>
                Supprimer une photo
              </button>
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
          <label htmlFor="category">Catégories</label>
          <select
            {...register("category")}
            id="category"
            className="text-field"
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

        {/* <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {allTags.map((tag) => (
              <div key={tag.id} className="tag-item">
                <input
                  type="checkbox"
                  value={tag.id}
                  id={`tag-${tag.id}`}
                  {...register("tags")}
                  defaultChecked={fetchAdDetails?.tags?.some(
                    (adTag) => adTag.id === tag.id
                  )}
                  onChange={(e) => {
                    const selectedTags = getValues("tags") || [];
                    if (e.target.checked) {
                      setValue("tags", [...selectedTags, tag.id]); // Ajoute le tag
                    } else {
                      setValue(
                        "tags",
                        selectedTags.filter((id) => id !== tag.id)
                      ); // Retire le tag
                    }
                  }}
                />
                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
          </div>
          {errors.tags && (
            <span className="error-message">{errors.tags.message}</span>
          )}
        </div> */}

        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default UpdateAdPage;

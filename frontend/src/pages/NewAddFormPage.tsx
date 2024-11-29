// import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { AdFormProps } from "../components/AdCard";

export type Category = {
  id: number;
  title: string;
};

export type Tag = {
  id: number;
  name: string;
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
  const { register, handleSubmit, control } = useForm<AdFormProps>({
    defaultValues: {
      title: "Titre par défaut",
      description: "description",
      owner: "auteur",
      price: 100,
      location: "Paris",
      // pictures:
      //   "https://imgs.search.brave.com/lOHbtcdsUNgMT7uRcsOCb4DqSn7PVaoHNkpP3Tk0rHo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFJa1RWb21pckwu/X0FDLl9TUjE4MCwy/MzAuanBn",
      // tags:
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures", // name of the field array
  });

  const onSubmit: SubmitHandler<AdFormProps> = async (formData) => {
    //préparer le payload

    console.log("formData ", formData);

    const dataPayload = {
      ...formData,
      createdAt: new Date(formData.createdAt).toISOString(), //Date
      tags: formData.tags.map(Number), //number[]
      category: Number(formData.category), //number
      pictures: formData.pictures, //string[]
    };
    console.log("payload ", dataPayload);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Titre</label>
          <input {...register("title")} className="text-field" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input {...register("description")} className="text-field" />
        </div>

        <div className="form-group">
          <label>Auteur</label>
          <input {...register("owner")} className="text-field" />
        </div>

        <div className="form-group">
          <label>Prix</label>
          <input {...register("price")} className="text-field" type="number" />
        </div>

        <div className="form-group">
          <label>Localisation</label>
          <input {...register("location")} className="text-field" />
        </div>

        <div className="form-group">
          <label>Date de création</label>
          <input
            {...register("createdAt")}
            className="text-field"
            type="date"
          />
        </div>

        {/* <div className="form-group">
          <label>Photos</label>
          <input {...register("pictures")} className="text-field" />
        </div> */}

        <div className="form-group">
          <button onClick={() => append({ url: "" })} className="text-field button">
            Ajouter une photo
          </button>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`pictures.${index}.url`)}
                className="text-field"
              />
              <button onClick={() => remove(index)}>Supprimer une photo</button>
            </div>
          ))}
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
        </div>

        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default NewAddFormPage;

// import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";

type category = {
  id: string;
  title: string;
};

const NewAddFormPage = () => {
  const [categories, setCategories] = useState<category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<category[]>(
          "http://localhost:3000/categories"
        );
        if (response.data) setCategories(response.data);
        //   console.log("categories",categories);
      } catch (error) {
        console.log("error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  console.log("categories : ", categories);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    

    //
    const rawDate = formJson.createdAt as string; // Format "YYYY-MM-DD"
    const fullDate = new Date(`${rawDate}`).toISOString(); // Ajout de l'heure par défaut

    console.log("Date ISO String :", fullDate);
    
    //
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre :</label>
        <input className="text-field" name="title" id="title" />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description :</label>
        <input className="text-field" name="description" id="description" />
      </div>

      <div className="form-group">
        <label htmlFor="owner">Auteur :</label>
        <input className="text-field" name="owner" id="owner" />
      </div>

      <div className="form-group">
        <label htmlFor="price">Prix :</label>
        <input className="text-field" name="price" id="price" type="number" />
      </div>

      <div className="form-group">
        <label htmlFor="location">Localisation :</label>
        <input className="text-field" name="location" id="location" />
      </div>

      <div className="form-group">
        <label htmlFor="createdAt">Date de création :</label>
        <input
          className="text-field"
          name="createdAt"
          id="createdAt"
          type="date"
        />
      </div>

      <div className="form-group">
        <label htmlFor="pictures">Photos :</label>
        <input className="text-field" name="pictures" id="pictures" />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégories :</label>
        <input className="text-field" name="category" id="category" />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags :</label>
        <input className="text-field" name="tags" id="tags" />
      </div>

      <div>
        <button type="submit" className="btn-sumbit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewAddFormPage;

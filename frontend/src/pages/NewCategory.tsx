// import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { validate } from "../validation/validate";
import axios from "axios";
import { toast } from "react-toastify";

export type CategoryPayload = {
  title: string;
};

const NewCategory = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
    // reset,
  } = useForm<CategoryPayload>({
    defaultValues: {
      title: "",
    },
    // resolver: yupResolver(validate),
    mode: "all",
  });

  const onSubmit: SubmitHandler<CategoryPayload> = async (formData) => {
    // console.log("formData ", formData);
    const dataPayload = {
      ...formData,
    };
    // console.log("payload ", dataPayload);
    try {
      await axios.post<CategoryPayload>(
        "http://localhost:3000/categories",
        dataPayload
      );

      toast.success("🚀 La Catégorie a été créée avec succès !");
      navigate("/");
    } catch (error) {
      console.error("Error create category", error);
      toast.error("Une erreur est survenue lors de la création de l'annonce");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Catégorie</label>
          <input
            {...register("title", {
              minLength: { value: 4, message: "Minimum 4 caratères" },
              required: "La catégorie est obligatoire",
            })}
            placeholder="Titre de la categorie"
            className="text-field"
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>
        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default NewCategory;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-toastify/dist/ReactToastify.css";
import { object, string } from "yup";

const loginSchema = object().shape({
  email: string().email("Email invalide").required("L'email est obligatoire"),
  password: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
});

const LoginPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <div className="page-container">
      <form className="form-content">
        <h2>Connexion</h2>

        <div className="form-group">
          <label>Email</label>
          <input {...register("email")} className="text-field" />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            {...register("password")}
            className="text-field"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <input type="submit" className="button" value="Se connecter" />
      </form>
    </div>
  );
};

export default LoginPage;

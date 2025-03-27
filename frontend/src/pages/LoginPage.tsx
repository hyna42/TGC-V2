import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "../validation/loginSchema";
import { useLoginMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
    login({
      variables: { data: { email: data.email, hashedPassword: data.password } },
      onCompleted: () => {
        toast.success("Loggin successful");
        navigate("/");
      },
      onError: (error) => {
        console.error("Errro try login", error);
        toast.error("Identifants invalides");
      },
    });
  };

  return (
    <div className="page-container">
      <form className="form-content" onSubmit={handleSubmit(onSubmit)}>
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

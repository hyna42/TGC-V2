import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gql, useMutation } from "@apollo/client";
import { signupSchema } from "../validation/signupSchema";

const SIGNUP_MUTATION = gql`
  mutation Signup($data: UserInput!) {
    signup(data: $data)
  }
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signup] = useMutation(SIGNUP_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: { email: string; hashedPassword: string }) => {
    try {
      await signup({ variables: { data } });
      toast.success("Compte créé avec succès !");
      navigate("/login");
    } catch (error) {
      console.error("Erreur création utilisateur:", error);
      toast.error("Erreur lors de la création du compte");
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-content">
        <h2>Créer un compte</h2>

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
            {...register("hashedPassword")}
            className="text-field"
          />
          {errors.hashedPassword && (
            <span className="error-message">
              {errors.hashedPassword.message}
            </span>
          )}
        </div>

        <input type="submit" className="button" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignUpPage;

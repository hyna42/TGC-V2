import { useParams } from "react-router-dom";

const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Typer l'id

  return (
    <div>
      <h1>Détails de l'annonce</h1>
      <p>ID de l'annonce : {id}</p>
    </div>
  );
};

export default AdDetailsPage;

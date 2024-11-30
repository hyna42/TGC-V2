import { Link } from "react-router-dom";

export type AdCardProps = {
  id: number;
  title: string;
  pictures: string[]; // Tableau d'URLs (chaînes)
  price: number;
  category: {
    id: number;
    title: string;
  };
};

// export type AdFormPartialProps = Pick<AdFormProps, "title"|"description"|"pictures">;


const AdCard = ({ title, pictures, price, category, id }: AdCardProps) => {
  return (
    <>
      <div className="ad-card-container">
        <Link className="ad-card-link" to={`/ad/${id}`}>
          <img className="ad-card-image" src={pictures[0]} />
          <div className="ad-card-text">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">| {price} €</div>
          </div>
          <p className="ad-card-category">{category?.title} </p>
        </Link>
      </div>
    </>
  );
};

export default AdCard;

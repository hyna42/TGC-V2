import { Link } from "react-router-dom";

export type AdFormProps = {
  id: number;
  title: string;
  pictures: { url: string }[]; // tableau d'objets avec `url`
  price: number;
  category: {
    id: number;
    title: string;
  };
  // category: number,
  // tags: [{ id: number; name: string[] }];
  tags: number[];
  createdAt: Date;
  description: string;
  location: string;
  owner: string;
  // link: string | "#";
};

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


// Type réduit pour l'affichage

// export type AdCardProps = Pick<
//   AdFormProps,
//   "id" | "title" | "pictures" | "price" | "category"
// >;

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

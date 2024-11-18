import { Link } from "react-router-dom";

export type AdCardProps = {
  id: number;
  title: string;
  pictures: string;
  price: number;
  category?: {
    id: number;
    title: string;
  };
  tags?: [{ id: number; name: string[] }];
  createdAt?: Date;
  description?: string;
  location?: string;
  owner?: string;
  // link: string | "#";
};

const AdCard = ({ title, pictures, price, category, id }: AdCardProps) => {
  return (
    <>
      <div className="ad-card-container">
        <Link className="ad-card-link" to={`/ad/${id}`}>
          <img className="ad-card-image" src={pictures} />
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

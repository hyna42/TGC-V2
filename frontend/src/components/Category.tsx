import { Link } from "react-router-dom";

export type CategoryProps = {
  id?: number;
  title: string;
};
const Category = ({ title }: CategoryProps) => {
  return (
    <>
      <Link
        to={`ad/search?category=${title}`}
        className="category-navigation-link"
      >
        {title}
      </Link>
    </>
  );
};

export default Category;

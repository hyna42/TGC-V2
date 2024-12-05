export type CategoryProps = {
  id: number;
  title: string;
};
const Category = ({ id, title }: CategoryProps) => {
  return (
    <>
      <a href={`/category/${id}`} className="category-navigation-link">
        {title}
      </a>{" "}
    </>
  );
};

export default Category;

export type CategoryProps = {
  link: string;
  name: string;
};
const Category = ({ link, name }: CategoryProps) => {
  return (
    <>
      <a href={link} className="category-navigation-link">
        {name}
      </a>{" "}
    </>
  );
};

export default Category;

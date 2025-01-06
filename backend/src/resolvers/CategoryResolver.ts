import CategroyInput from "../inputs/CategoryInput";
import { Category } from "../entities/Category";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpdateCategroyInput from "../inputs/UpdateCategoryInput";

@Resolver(Category)
class CategoryResolver {
  //get all categories
  @Query(() => [Category])
  async getAllCategories() {
    return await Category.find();
  }

  //getCategory by id
  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number) {
    return await Category.findOneBy({ id });
  }

  //delete Category
  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: number) {
    const categoryToDelete = await Category.findOneBy({ id });
    await categoryToDelete?.remove();
    return `Category ${id} has been deleted`;
  }

  //create category
  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategroyInput) {
    const categoryToSave = Category.create({ ...data });
    const result = await categoryToSave.save();
    return result;
  }

  //update category
  @Mutation(() => String)
  async updateCategory(@Arg("data") data: UpdateCategroyInput) {
    const categoryToUpdate = await Category.findOneBy({
      id: data.id,
    });

    if (categoryToUpdate)
      Object.assign(categoryToUpdate, { title: data.title });

    await categoryToUpdate?.save();
    return `Category ${data.id} has been updated`;
  }
}

export default CategoryResolver;

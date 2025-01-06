import { FindManyOptions, ILike, In } from "typeorm";
import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import AdInput from "../inputs/AdInput";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Picture } from "../entities/Picture";
import UpdateAdInput from "../inputs/UpdateAdInput";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  //get all ads
  async getAllAds(
    @Arg("title", { nullable: true }) title?: string,
    @Arg("category", { nullable: true }) category?: string
  ) {
    let ads: Ad[] = [];
    let findOptions: FindManyOptions<Ad> = {
      order: {
        id: "DESC",
      },
    };

    if (title) {
      findOptions = {
        ...findOptions,
        where: {
          title: ILike(`%${title}%`),
        },
      };
    }

    if (category) {
      findOptions = {
        ...findOptions,
        where: { category: { title: category } },
      };
    }
    ads = await Ad.find(findOptions);
    return ads;
  }

  //get ad by category
  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    return await Ad.findOne({ where: { id: id } });
  }

  //delete ad
  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number) {
    const adToDelete = await Ad.findOne({ where: { id } });

    await adToDelete?.remove();
    return "Ad has been deleted";
  }

  //create new ad
  @Mutation(() => Ad)
  async createNewAd(@Arg("data") data: AdInput) {
    // Gestion de la relation Category
    let category: Category | undefined = undefined;
    if (data.categoryId) {
      category =
        (await Category.findOne({
          where: { id: data.categoryId },
        })) || undefined;
    }

    // Gestion de la relation Tags
    let tags: Tag[] = [];
    if (data.tagIds && data.tagIds?.length > 0) {
      tags = await Tag.findBy({ id: In(data.tagIds) });
    }

    // Gestion de la relation Pictures
    let pictures: Picture[] = [];
    if (data.pictures && data.pictures.length > 0) {
      data.pictures.forEach((el) => {
        const newPicture = new Picture();
        newPicture.url = el;
        pictures.push(newPicture);
      });
    }

    const adToSave = Ad.create({
      ...data,
      category,
      pictures,
      tags,
    });
    const result = await adToSave.save();
    return result;
  }

  //update ad
  @Mutation(() => String)
  async updateAd(@Arg("data") updateData: UpdateAdInput) {
    // Retrieve the ad along with its relations
    let adToUpdate = await Ad.findOne({
      where: { id: updateData.id },
      relations: ["tags", "category", "pictures"],
    });

    if (!adToUpdate) {
      throw new Error("Ad not found");
    }

    // Update basic fields using Object.assign
    Object.assign(adToUpdate, {
      title: updateData.title,
      description: updateData.description,
      owner: updateData.owner,
      price: updateData.price,
      location: updateData.location,
      createdAt: updateData.createdAt,
    });

    // Update tags if `tagIds` is provided
    if (updateData.tagIds) {
      const newTags = await Tag.findBy({ id: In(updateData.tagIds) });
      adToUpdate.tags = newTags;
    }

    // Update category if `categoryId` is provided
    if (updateData.categoryId) {
      const newCategory = await Category.findOneBy({
        id: updateData.categoryId,
      });
      if (!newCategory) {
        throw new Error("Category not found");
      }
      adToUpdate.category = newCategory;
    }

    // Update pictures if `pictures` is provided
    if (updateData.pictures) {
      // Delete existing pictures
      await Picture.delete({ ad: { id: adToUpdate.id } });

      // Create new pictures
      const newPictures = updateData.pictures.map((url) => {
        const picture = new Picture();
        picture.url = url;
        picture.ad = adToUpdate;
        return picture;
      });
      adToUpdate.pictures = newPictures;
    }

    // Save the updated ad
    await adToUpdate.save();
    return `Ad ${updateData.id} has been updated`;
  }
}

export default AdResolver;

import { FindManyOptions, ILike, In } from "typeorm";
import { Ad } from "../entities/Ad";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import AdInput from "../inputs/AdInput";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Picture } from "../entities/Picture";
import UpdateAdInput from "../inputs/UpdateAdInput";
import { User } from "../entities/User";

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

  //get ad by id
  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    return await Ad.findOne({ where: { id: id } });
  }

  //delete ad
  @Authorized()
  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number, @Ctx() context: any) {
    const adToDelete = await Ad.findOne({ where: { id } });

    //verifier que la personne qui essaye de supprimer l'annonce en est bien l'auteur
    if (context.email !== adToDelete?.user.email)
      throw new Error("Action non autorisée");

    await adToDelete?.remove();
    return "Ad successfully deleted!";
  }

  //create new ad
  @Authorized()
  @Mutation(() => String)
  async createNewAd(@Arg("data") data: AdInput, @Ctx() context: any) {
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

    //gestion de la relation user (auteur de l'annonce)
    const user = await User.findOneBy({ email: context.email });
    if (!user) throw new Error("Utilisateur introuvable");

    const adToSave = Ad.create({
      ...data,
      category,
      pictures,
      tags,
      user,
    });
    await adToSave.save();
    return `Ad successfully created!`;
  }

  //update ad
  @Authorized()
  @Mutation(() => String)
  async updateAd(@Arg("data") updateData: UpdateAdInput, @Ctx() context: any) {
    // Retrieve the ad along with its relations
    let adToUpdate = await Ad.findOne({
      where: { id: updateData.id },
      relations: ["tags", "category", "pictures"],
    });

    if (!adToUpdate) {
      throw new Error("Ad not found");
    }

    if (context.email !== adToUpdate?.user.email)
      throw new Error("Action non autorisée");

    // Update basic fields using Object.assign
    Object.assign(adToUpdate, {
      title: updateData.title,
      description: updateData.description,
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

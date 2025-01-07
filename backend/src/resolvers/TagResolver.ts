import TagInput from "../inputs/TagInput";
import { Tag } from "../entities/Tag";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpdateTagInput from "../inputs/UpdateTagInput";

@Resolver(Tag)
class TagResolver {
  //getAllTags
  @Query(() => [Tag])
  async getAllTags() {
    return Tag.find();
  }

  //getTagById
  @Query(() => Tag)
  async getTagById(@Arg("id") id: number) {
    return Tag.findOneBy({ id });
  }

  //createTag
  @Mutation(() => Tag)
  async createTag(@Arg("data") data: TagInput) {
    const newTag = Tag.create({ ...data });
    await newTag.save();
    return newTag;
  }

  //deleteTag
  @Mutation(() => String)
  async deleteTag(@Arg("id") id: number) {
    const TagToDelete = await Tag.findOneBy({ id });
    await TagToDelete?.remove();
    return `Tag has been deleted successfully`;
  }

  //update Tag
  @Mutation(() => String)
  async updateTag(@Arg("data") data: UpdateTagInput) {
    const TagToUpdate = await Tag.findOneBy({ id: data.id });

    if (TagToUpdate) {
      Object.assign(TagToUpdate, { name: data.name });
    }
    await TagToUpdate?.save();

    return `Tag ${data.id} has bee updated`;
  }
}

export default TagResolver;

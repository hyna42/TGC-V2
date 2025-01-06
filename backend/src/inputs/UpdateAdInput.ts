import { Field, InputType, Int } from "type-graphql";

@InputType()
class UpdateAdInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  //on vas strocker une liste de chaines d'urls de Pictures
  @Field(() => [String], { nullable: true })
  pictures?: string[];

  //on va recevoir l'ID de la catagory plutôt que l'objet Category complet
  @Field(() => Int,{ nullable: true })
  categoryId?: number;

  //on va recevoir une liste d'IDs de Tags plutôt que des objets Tags complets
  @Field(() => [Int], { nullable: true })
  tagIds?: number[];
}

export default UpdateAdInput;

import { Field, InputType, Int } from "type-graphql";

@InputType()
class AdInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  location: string;

  @Field()
  createdAt: Date;

  //on vas strocker une liste de chaines d'urls de Pictures
  @Field(() => [String], { nullable: true })
  pictures?: string[];

  //on va recevoir l'ID de la catagory plutôt que l'objet Category complet
  @Field(() => Int)
  categoryId: number;

  //on va recevoir une liste d'IDs de Tags plutôt que des objets Tags complets
  @Field(() => [Int], { nullable: true })
  tagIds?: number[];
}

export default AdInput;

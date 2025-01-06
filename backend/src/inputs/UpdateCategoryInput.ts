// import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class UpdateCategroyInput {
  @Field()
  id: number;

  @Field()
  title?: string;
}

export default UpdateCategroyInput;

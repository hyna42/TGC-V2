// import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class CategroyInput {
  @Field()
  title: string;
}

export default CategroyInput;

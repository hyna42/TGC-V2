import { Field, InputType } from "type-graphql";

@InputType()
class TagInput {
  @Field()
  name: string;
}

export default TagInput;

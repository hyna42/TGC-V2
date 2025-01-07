import { Field, InputType } from "type-graphql";

@InputType()
class UpdateTagInput {
  @Field()
  id: number;

  @Field()
  name?: string;
}

export default UpdateTagInput;

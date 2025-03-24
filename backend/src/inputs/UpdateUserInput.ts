import { Field, InputType } from "type-graphql";

@InputType()
class UpdateUserInput {
  @Field()
  email?: string;

  @Field()
  hashedPassword?: string;

  // @Field(() => [Int], { nullable: true })
  // adIds?: number;
}

export default UpdateUserInput;

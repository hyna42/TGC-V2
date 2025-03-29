import { Field, InputType } from "type-graphql";

@InputType()
class UpdateUserSignUpInput {
  @Field()
  email?: string;

  @Field()
  hashedPassword?: string;

  // @Field(() => [Int], { nullable: true })
  // adIds?: number;
}

export default UpdateUserSignUpInput;

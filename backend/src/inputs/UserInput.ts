import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  @MinLength(8, {
    message: "le mot de passe doit contenir au moins 8 caractères",
  })
  hashedPassword: string;

  // @Field(() => [Int], { nullable: true })
  // adIds?: number;
}

export default UserInput;

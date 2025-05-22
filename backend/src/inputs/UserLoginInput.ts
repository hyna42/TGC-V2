import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class UserLoginInput {
  @Field()
  email: string;

  @Field()
  @MinLength(8, {
    message: "le mot de passe doit contenir au moins 8 caractères",
  })
  hashedPassword: string;
}

export default UserLoginInput;

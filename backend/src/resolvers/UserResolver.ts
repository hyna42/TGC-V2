import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import UserInput from "../inputs/UserInput";
import * as argon2 from "argon2";

@Resolver(User)
class UserResolver {
  //inscription : signup
  @Mutation(() => String)
  async signup(@Arg("data") data: UserInput) {
    const password = await argon2.hash(data.hashedPassword);

    const newUser = User.create({
      ...data,
      hashedPassword: password,
    });
    await newUser.save();
    return `user ${data.email} successfully created`;
  }

  //connexion : login
  // @Mutation(() => User)
  // async login(@Arg("data") id: number) {
  //   return User.findOneBy({ id });
  // }

  //deconnexion : logout

  //deleteUser == supprimer mon compte
  // @Mutation(() => String)
  // async deleteUser(@Arg("id") id: number) {
  //   const UserToDelete = await User.findOneBy({ id });
  //   await UserToDelete?.remove();
  //   return `User successfully deleted`;
  // }

  //update User
  // @Mutation(() => String)
  // async updateUser(@Arg("data") data: UpdateUserInput) {
  //   const UserToUpdate = await User.findOneBy({ id: data.id });

  //   if (UserToUpdate) {
  //     Object.assign(UserToUpdate, { name: data.name });
  //   }
  //   await UserToUpdate?.save();

  //   return `User successfully updated`;
  // }
}

export default UserResolver;

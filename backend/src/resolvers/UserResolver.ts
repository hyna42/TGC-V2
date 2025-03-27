import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import UserInput from "../inputs/UserInput";
import * as argon2 from "argon2";
import "dotenv/config";
import jwt, { Secret } from "jsonwebtoken";

@ObjectType()
class UserInfos {
  @Field({ nullable: true })
  email?: string;

  @Field()
  isLoggedIn: boolean;
}

@Resolver(User)
class UserResolver {
  //inscription : signup
  @Mutation(() => String)
  async signup(@Arg("data") data: UserInput) {
    const password = await argon2.hash(data.hashedPassword);

    const newUser = User.create({
      email: data.email,
      hashedPassword: password,
    });
    await newUser.save();
    return `user ${data.email} successfully created`;
  }

  //connexion : login
  @Mutation(() => String)
  async login(@Arg("data") data: UserInput, @Ctx() context: any) {
    const user = await User.findOneBy({ email: data.email });
    if (!user) throw new Error("Identifiants invalides");
    const isPasswordCorrect = await argon2.verify(
      user?.hashedPassword,
      data.hashedPassword
    );
    if (!isPasswordCorrect) throw new Error("Identifiants incorrects");

    //générer un JWT token
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY manquant dans .env");
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY as Secret
    );

    //ajouter un cookie dans la réponse http
    context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);

    return "login ok";
  }

  //deconnexion : logout
  @Mutation(() => String)
  async logout(@Ctx() context: any) {
    context.res.setHeader(
      "Set-Cookie",
      `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`
    );
    return "logged out";
  }

  //recupère les informations de l'utilisateur connecté
  @Query(() => UserInfos)
  async Me(@Ctx() context: any) {
    if (context.email) {
      console.log("context.email", context.email);
      return { isLoggedIn: true, email: context.email };
    } else {
      return { isLoggedIn: false };
    }
  }

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

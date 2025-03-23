import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";
import { MinLength } from "class-validator";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  @MinLength(8, {
    message: "le mot de passe doit contenir au moins 8 caractères",
  })
  hashedPassword: string;

  //Relation OneToMany avec ads
  @Field(() => [Ad], { nullable: true })
  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[];
}

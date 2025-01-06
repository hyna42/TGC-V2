import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MinLength } from "class-validator";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @MinLength(2)
  @Column({ unique: true })
  title: string;
  
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}

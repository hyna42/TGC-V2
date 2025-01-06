import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MinLength } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ObjectType } from "type-graphql";
import { Picture } from "./Picture";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  @MinLength(10)
  description: string;

  @Field()
  @Column()
  owner: string;

  @Field()
  @Column("float")
  price: number;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  createdAt: Date;

  //Relation One-To-many avec la table Picture
  @Field(() => [Picture], { nullable: true })
  @OneToMany(() => Picture, (picture) => picture.ad, {
    eager: true,
    cascade: true,
  })
  pictures: Picture[];

  //Relation Many-To-One avec la category
  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  //Relation Many-To-Many avec les Tags
  @Field(()=>[Tag],  { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true,})
  @JoinTable()
  tags: Tag[];
}

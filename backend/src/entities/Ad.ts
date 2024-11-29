import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MinLength } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @MinLength(10)
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @Column()
  createdAt: Date;

  @Column("simple-array")
  pictures: string[];

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  tags: Tag[];
}

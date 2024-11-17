import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MinLength } from "class-validator";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(2)
  @Column({ unique: true })
  title: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}

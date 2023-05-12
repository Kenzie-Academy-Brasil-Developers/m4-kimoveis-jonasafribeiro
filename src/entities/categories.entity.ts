import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_estate.entity";

@Entity({ name: "categories" })
class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
  realEstates: RealEstate[];
}

export { Category };

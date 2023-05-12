import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_estate.entity";

@Entity({ name: "addresses" })
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  street: string;

  @Column({ type: "varchar", length: 8 })
  zipCode: string;

  @Column({ type: "varchar", length: 8, nullable: true })
  number?: string;

  @Column({ type: "varchar", length: 20 })
  city: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (realEstate) => realEstate.address)
  realEstates: RealEstate;
}

export { Address };

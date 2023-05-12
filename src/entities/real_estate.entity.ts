import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Schedule } from "./schedules.entity";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";

@Entity({ name: "real_estate" })
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  value: number | (() => string);

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToOne(() => Address, (address) => address.realEstates, {
    cascade: true,
  })
  @JoinColumn({ name: "addressId" })
  address: Address;

  @ManyToOne(() => Category, (category) => category.realEstates, {
    cascade: true,
  })
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Schedule[];
}

export { RealEstate };

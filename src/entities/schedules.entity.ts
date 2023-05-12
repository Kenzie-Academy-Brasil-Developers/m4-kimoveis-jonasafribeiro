import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";
import { RealEstate } from "./real_estate.entity";

@Entity({ name: "schedules" })
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.schedules, {
    cascade: true,
  })
  @JoinColumn({ name: "realEstateId" })
  realEstate: RealEstate;

  @ManyToOne(() => User, (user) => user.schedules)
  @JoinColumn({ name: "userId" })
  user: User;
}

export { Schedule };

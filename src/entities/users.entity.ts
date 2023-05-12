import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Schedule } from "./schedules.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt?: string | Date | null | undefined;

  @BeforeInsert()
  @BeforeUpdate()
  hashPasssword() {
    const isEncripted = getRounds(this.password);

    if (!isEncripted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];
}

export { User };

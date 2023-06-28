import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Schedule from "./schedules.entity";
import Address from "./address.entity";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type:"boolean", default: "false" })
  sold: boolean;

  @Column({ type: "float", default: 0 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @OneToMany(() => Schedule, (s) => s.realEstate)
  schedules: Schedule[];

  @OneToOne(() => Address, (address) => address.realEstate)
  @JoinColumn()
  address: Address;

  // *** TIRAR DÚVIDAS SOBRE OS RELACIONAMENTOS
}

export default RealEstate
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_estate.entity";
@Entity("addresses")
class Address{
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  street: string
  
  @Column({ length: 8 })
  zipCode: string
  
  @Column({ type: "varchar", length: 7, nullable: true })
  number?: string | null | undefined;
  
  @Column({ length: 20 })
  city: string;
  
  @Column({ length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (realEstate) => realEstate.address)
  realEstate?: RealEstate | null | undefined 
}

export { Address }
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'shoes' })
class Shoe extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ type: 'varchar', length: 250 })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'float' })
  size: number

  @Column({ type: 'float' })
  price: number

  @CreateDateColumn({ type: 'timestamptz' })
  datePosted: Date

  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated: Date
}

export default Shoe

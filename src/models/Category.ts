import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Transaction from './Transaction'
@Entity('category')

class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_name: string;

  @ManyToOne(() => Transaction)
  @JoinColumn({ name: 'id' })
  provider: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;

import { Book } from '../../books/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  book: Book;

  @Column()
  userName: string;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}

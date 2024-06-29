import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Email {}

@Entity()
export class EmailOptions {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column()
  html: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  userName: string;

  @Column()
  userPassword: string;

  @Column()
  age: number;

  @Column({ default: true })
  isActive: boolean;
}

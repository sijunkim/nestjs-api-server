import { Column, Entity, IsNull, OneToMany, PrimaryColumn } from 'typeorm';
import { Photo } from '@photo/entities/photo.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  signupVerifyToken: string;

  @Column({ length: 20, nullable: true })
  address?: string;

  @Column({ default: 0 })
  age?: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Photo, (photo) => photo.user, { cascade: true })
  photos: Photo[];
}

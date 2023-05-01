import { PhotoMetadata } from 'src/photometadata/entities/photometadata.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn({ name: 'photo_id', type: 'int' })
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('double')
  views: number;

  @Column()
  isPublished: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @OneToOne((type) => PhotoMetadata, (metadata) => metadata.photo, {
    cascade: true,
  })
  photoMetadata: PhotoMetadata;
}

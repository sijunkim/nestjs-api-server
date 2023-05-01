import { PhotoMetadata } from 'src/photometadata/entities/photometadata.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
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

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
  photoMetadata: PhotoMetadata;
}

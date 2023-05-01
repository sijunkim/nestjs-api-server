import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Photo } from '../../photo/entities/photo.entity';

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne((type) => Photo, (photo) => photo.photoMetadata)
  @JoinColumn()
  photo: Photo;
}

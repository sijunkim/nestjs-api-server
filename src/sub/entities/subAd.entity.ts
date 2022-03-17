import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubAd {
  @PrimaryGeneratedColumn()
  subAd_no: number;
  @Column()
  subAd_title: string;
  @Column()
  subAd_prod: string;
  @Column()
  subAd_info: string;
  @Column()
  subAd_price: number;
  @Column()
  subAd_quntity: number;
  // @Column()
  // subAd_APdt: Date;
  // @Column()
  // subAd_DDdt: Date;
  // @Column()
  // sub_stat_cd: string;
  // @Column()
  // subAd_type: string;

  // @Column()
  // reg_id: string;
  // @Column()
  // reg_dt: Date;
  // @Column()
  // edit_id: string;
  // @Column()
  // edit_dt: Date;
}

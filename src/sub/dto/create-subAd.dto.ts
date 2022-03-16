import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSubAdDto {
  @IsNumber()
  subAd_no: number;
  @IsString()
  subAd_title: string;
  @IsString()
  subAd_prod: string;
  @IsString()
  subAd_info: string;
  @IsNumber()
  subAd_price: number;
  @IsNumber()
  subAd_quntity: number;
  @IsDate()
  subAd_APdt: Date;
  @IsDate()
  subAd_DDdt: Date;
}

import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { LocalDate } from 'js-joda';
import { IsNull } from 'typeorm';

export class CreateSubAdDto {
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
}

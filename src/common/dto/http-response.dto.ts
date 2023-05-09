import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorType } from '../enum/error-type.enum';

export class HttpResponseDto {
  @ApiProperty({ description: 'status code' })
  protected status: number;

  @ApiProperty({ description: '에러코드' })
  protected code: number | ErrorType;

  @ApiProperty({ description: '에러 메세지' })
  protected messages: string[];

  constructor(status: number = HttpStatus.OK, code: number = ErrorType.NO_ERROR, messages: string[] = []) {
    this.status = status;
    this.code = code;
    this.messages = messages;
  }
}

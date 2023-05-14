import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorType } from '../enum/error-type.enum';

export class HttpResponseDto {
  @ApiProperty({ description: '상태 코드' })
  status?: number;

  @ApiProperty({ description: '에러코드' })
  code?: number | ErrorType;

  @ApiProperty({ description: '에러 메세지' })
  messages?: string[];

  constructor(
    status: number = HttpStatus.OK,
    code: number = ErrorType.NO_ERROR,
    messages: string[] = [],
  ) {
    this.status = status;
    this.code = code;
    this.messages = messages;
  }
}

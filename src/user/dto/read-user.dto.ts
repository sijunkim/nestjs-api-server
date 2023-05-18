import { HttpResponseDto } from 'src/common/dto/http-response.dto';
import { User } from '../entities/user.entity';

export class ReadUserResponseDto extends HttpResponseDto {
  users?: User[];
}

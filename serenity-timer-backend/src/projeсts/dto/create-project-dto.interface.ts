import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  time: number;

  @ApiProperty()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty()
  @IsNotEmpty()
  todoistProjectId: string;
}

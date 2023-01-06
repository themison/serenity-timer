import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty()
  @IsNotEmpty()
  updateTime: number;
}

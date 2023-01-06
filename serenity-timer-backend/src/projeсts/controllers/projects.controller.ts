import { Body, Controller, Post, Req, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user-dto.interface';
import { CreateProjectDto } from '../dto/create-project-dto.interface';
import { UpdateProjectDto } from '../dto/update-project-dto.interface';
import { ProjectsService } from '../services/projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('/project')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: any,
  ) {
    const user = <UserDto>req.user;
    return this.projectsService.create(user, createProjectDto);
  }

  @Patch('/project')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: any,
  ) {
    // TODO: add guard to check project belong to user
    // const user = <UserDto>req.user;
    return this.projectsService.update(updateProjectDto);
  }
}

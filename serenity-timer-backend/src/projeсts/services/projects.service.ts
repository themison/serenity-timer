import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Project, ProjectDocument } from '../schemas/project.schema';
import { CreateProjectDto } from '../dto/create-project-dto.interface';
import { UserDto } from 'src/users/dto/user-dto.interface';
import { UsersService } from 'src/users/services/users.service';
import { UpdateProjectDto } from '../dto/update-project-dto.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Projects') private projectModel: Model<ProjectDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    { username }: UserDto,
    projectDto: CreateProjectDto,
  ): Promise<any> {
    const { time, projectName, todoistProjectId } = projectDto;
    const date = new Date();
    const owner = await this.usersService.findOne({ username });

    const project: Project = await this.projectModel.create({
      time,
      projectName,
      todoistProjectId,
      date,
      owner,
    });
    return project;
  }

  async update(projectDto: UpdateProjectDto): Promise<any> {
    const { projectId, updateTime } = projectDto;
    const prevProjectData = await this.projectModel.findById(projectId);

    const project: Project = await this.projectModel.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        time: prevProjectData.time
          ? prevProjectData.time + updateTime
          : updateTime,
      },
    );
    return project;
  }
}

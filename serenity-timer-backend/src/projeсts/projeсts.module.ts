import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectSchema } from './schemas/project.schema';
import { ProjectsService } from './services/projects.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Projects',
        schema: ProjectSchema,
      },
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}

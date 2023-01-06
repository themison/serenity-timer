import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  _id: Types.ObjectId;

  //spent time in seconds
  @Prop({ required: true })
  time: number;

  @Prop({ required: false })
  date: Date;

  @Prop({ required: false })
  projectName: string;

  @Prop({ required: false })
  todoistProjectId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  owner: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

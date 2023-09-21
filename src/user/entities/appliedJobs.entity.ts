import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppliedJobsDocument = AppliedJobs & Document;

@Schema()
export class AppliedJobs extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  jobs:string[];
}

export const AppliedJobsSchema = SchemaFactory.createForClass(AppliedJobs);
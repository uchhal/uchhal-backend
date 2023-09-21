import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDescriptionDocument = JobDescription & Document;

@Schema()
export class JobDescription extends Document {
  
  @Prop({ required: true })
    jobId:string;

  @Prop({ required: true })
	description:string;

  @Prop({ required: true })
	required:string[];

  @Prop({ required: true })
	prefered:string[];

  @Prop({ required: true })
	responsibility:string[];


}

export const JobDescriptionSchema = SchemaFactory.createForClass(JobDescription);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AppliedUser } from './appliedUsers.entity';

export type InternalJobDocument =InternalJob & Document;

@Schema()
export class InternalJob extends Document {

  @Prop({ required: true })
	redirectId:string;
  
  @Prop({ required: true })
  companyName:string;

  @Prop({ required: true })
	title:string;

  @Prop({ required: true })
	location:string;

  @Prop({ required: true })
	imageUrl:string;

  @Prop({ required: true })
	type:string;

  @Prop({ required: true })
	requiredExperience:string;

  @Prop({ required: true })
	salary:string;

  @Prop({ required: true })
	skills:string;
  
  appliedUsers:AppliedUser[];


}

export const InternalJobSchema = SchemaFactory.createForClass(InternalJob);
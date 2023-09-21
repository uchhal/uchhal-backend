import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Usertype } from '../dto/create-internalJob.dto';

export type AppliedUserDocument = AppliedUser & Document;

@Schema()
export class AppliedUser extends Document{

    @Prop({required: true})
    jobId: string;

    @Prop({required: true})
    users:Usertype[];

}

export const AppliedUserSchema = SchemaFactory.createForClass(AppliedUser);
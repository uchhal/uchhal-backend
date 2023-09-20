import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppliedUserDocument = AppliedUser & Document;

@Schema()
export class AppliedUser extends Document{

    @Prop({ required: true })
    userId : string;


    @Prop({ required: true })
    userName : string;


    @Prop({ required: true })
    userScore : number;

}

export const AppliedUserSchema = SchemaFactory.createForClass(AppliedUser);
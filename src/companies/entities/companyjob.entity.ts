import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyjobDocument = Companyjob & Document;

@Schema()
export class Companyjob{


    @Prop({ required: true })
    jobid: string;


    @Prop({ required: true })
    title:string;


    @Prop({ required: true })
    location:string;


    @Prop({ required: true })
    type:string;


    @Prop({ required: true })
    experience:string;


}


export const ComapnyjobSchema = SchemaFactory.createForClass(Companyjob);
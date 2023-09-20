import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Companyjob } from './companyjob.entity';

export type CompanyDocument = Company & Document;



@Schema()
export class Company extends Document {

    @Prop({ required: true })
    name:string;


    @Prop({ required: true })
    description:string;


    @Prop({ required: true })
    logo:string;


    @Prop({ required: true })
    postedjobs:Companyjob[];



}

export const CompanySchema = SchemaFactory.createForClass(Company);

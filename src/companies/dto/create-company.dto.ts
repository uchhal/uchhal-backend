import {
    IsString,
    IsNotEmpty,
    IsOptional,
    MinLength,
  } from 'class-validator';



export class CreateCompanyDto {


    name:string;


    description:string;


    logo:string;
    

    postedjobs:[];


}

import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company,CompanyDocument } from './entities/company.entity';
import { AppliedUser } from 'src/jobs/entities/appliedUsers.entity';

@Injectable()
export class CompaniesService {


  constructor(@InjectModel(Company.name) private CompanyModel: Model<CompanyDocument>) {}


  async create(createCompanyDto: CreateCompanyDto) {
    const {name,description,logo} = createCompanyDto;
    const existingcompany = await this.CompanyModel.findOne({name})
    if (existingcompany){
      return {"message":"Company already exist"};
    }
    const Company =  this.CompanyModel.create(createCompanyDto)
    return  Company;
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: string) {
    return this.CompanyModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }


}

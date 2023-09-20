import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './entities/job.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInternalJobDto } from './dto/create-internalJob.dto';
import {
  InternalJob,
  InternalJobDocument,
} from './entities/internalJob.entity';
import {
  Company,
  CompanyDocument,
} from 'src/companies/entities/company.entity';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
import { UpdateCompanyDto } from 'src/companies/dto/update-company.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(InternalJob.name)
    private InternaljobModel: Model<InternalJobDocument>,
    @InjectModel(Company.name) private CompanyModel: Model<CompanyDocument>,
  ) {}

  create(createJobDto: CreateJobDto) {
    const job = this.jobModel.create(createJobDto);
    return job;
  }

  async createinternalJob(createinternalJobDto: CreateInternalJobDto) {
    try {
      const {
        redirectId,
        companyName,
        title,
        location,
        imageUrl,
        type,
        requiredExperience,
        salary,
        skills,
      } = createinternalJobDto;
      var existingcompany = await this.CompanyModel.findOne({
        name: companyName,
      });
      if (!existingcompany) {
        throw new Error('Company does not exist.');
      }
      const job = await new this.InternaljobModel(createinternalJobDto);

      const newcreatedjob = {
        jobid: job._id,
        title: title,
        location: location,
        type: type,
        experience: requiredExperience,
      };

      await this.CompanyModel.findOneAndUpdate(
        { name: companyName },
        { $push: { postedjobs: newcreatedjob } },
      );
      await job.save();

      return job;
    } catch (error) {
      console.log('[ERROR] [JOB SERVICE : createUser]', error);
      throw error;
    }
  }

  findAll() {
    return this.jobModel.find().exec();
  }

  findOne(id: string) {
    return this.jobModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}

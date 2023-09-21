import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './entities/job.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInternalJobDto, CreateJobDescription, UserDataJobApply } from './dto/create-internalJob.dto';
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
import { JobDescription, JobDescriptionDocument } from './entities/jobDescription.entity';
import { AppliedUser, AppliedUserDocument } from './entities/appliedUsers.entity';
import { AppliedJobs, AppliedJobsDocument } from 'src/user/entities/appliedJobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) 
    private jobModel: Model<JobDocument>,

    @InjectModel(InternalJob.name)
    private InternaljobModel: Model<InternalJobDocument>,

    @InjectModel(Company.name) 
    private CompanyModel: Model<CompanyDocument>,

    @InjectModel(JobDescription.name) 
    private JobDescriptionModel: Model<JobDescriptionDocument>,

    @InjectModel(AppliedUser.name) 
    private AppliedUserModel: Model<AppliedUserDocument>,

    @InjectModel(AppliedJobs.name) 
    private AppliedJobsModel: Model<AppliedJobsDocument>,
  ) {}

  create(createJobDto: CreateJobDto) {
    const job = this.jobModel.create(createJobDto);
    return job;
  }

  async createinternalJob(createinternalJobDto: CreateInternalJobDto, jobDescription: CreateJobDescription) {
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
      const newJobDescription = {
        jobId:job._id,
        description:jobDescription.description,
        required:jobDescription.required,
        prefered:jobDescription.prefered,
        responsibility:jobDescription.responsibility
      }

      const newJobApplied = {
        jobId:job._id,
        users:[]
      }
      const jobDesc = await new this.JobDescriptionModel(newJobDescription);
      const jobApplied = await new this.AppliedUserModel(newJobApplied);

      await job.save();
      await jobDesc.save();
      await jobApplied.save();

      return job;
    } catch (error) {
      console.log('[ERROR] [JOB SERVICE : createJob]', error);
      throw error;
    }
  }

  async findOneJobDescription(id: string){
    try{
      return this.JobDescriptionModel.findOne({jobId:id});
    } catch (error) {
      console.log('[ERROR] [JOB SERVICE : findJobDescription]', error);
      throw error;
    }
  }

  findAll() {
    return this.jobModel.find().exec();
  }

  findAllInternalJobs() {
    return this.InternaljobModel.find().exec();
  }

  async applyJob(data:UserDataJobApply) {
    try{
      const {userId, userName, userScore, jobId} = data;
      const newapplicant = {
        userId : userId,
        userName : userName,
        userScore : userScore
      }

      var userAppliedJobData = await this.AppliedJobsModel.findOne({
        _id : userId,
      });
      if (!userAppliedJobData) {
        const newdata = {
          userId:userId ,
          jobs:[]
        }
        this.AppliedJobsModel.create(newdata);
      }
      await this.AppliedJobsModel.findOneAndUpdate(
        { userId:userId },
        { $push: { jobs: jobId } },
      );
      await this.AppliedUserModel.findOneAndUpdate(
        { jobId: jobId },
        { $push: { users: newapplicant }},
      );

      return {"message":"successfully Applied"}
    } catch (error) {
      console.log('[ERROR] [JOB SERVICE : applyJob]', error);
      throw error;
    }
  }

  findOne(id: string) {
    return this.jobModel.findOne({ _id: id }).exec();
  }

  async appliedByUser(id: string) {
    try{
      const jobsappliedbyuser = await this.AppliedJobsModel.findOne({ userId: id }).exec();
      const jobsfulldata = await this.InternaljobModel.find({_id:{$in:jobsappliedbyuser.jobs}});
      return jobsfulldata;
    } catch (error) {
      console.log('[ERROR] [JOB SERVICE : applyJob]', error);
      throw error;
    }
  }

  async appliedUserInJob(id: string) {
    try{
      const applicants = await this.AppliedUserModel.findOne({jobId:id}).exec();
      return applicants.users;
    } catch (error) {
      console.log('[ERROR] [JOB SERVICE : applyJob]', error);
      throw error;
    }
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}

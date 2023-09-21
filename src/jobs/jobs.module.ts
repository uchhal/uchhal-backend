import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job,JobSchema } from './entities/job.entity';
import { InternalJob, InternalJobSchema } from './entities/internalJob.entity';
import { Company, CompanySchema } from 'src/companies/entities/company.entity';
import { JobDescription, JobDescriptionSchema } from './entities/jobDescription.entity';
import { AppliedUser, AppliedUserSchema } from './entities/appliedUsers.entity';
import { AppliedJobs, AppliedJobsSchema } from 'src/user/entities/appliedJobs.entity';


@Module({
  imports:[MongooseModule.forFeature([
    {name:Job.name,schema:JobSchema},
    {name:JobDescription.name,schema:JobDescriptionSchema},
    {name:InternalJob.name,schema:InternalJobSchema}, 
    {name:Company.name,schema:CompanySchema},
    {name:AppliedUser.name,schema:AppliedUserSchema},
    {name:AppliedJobs.name,schema:AppliedJobsSchema}])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

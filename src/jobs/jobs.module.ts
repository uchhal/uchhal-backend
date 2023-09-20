import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job,JobSchema } from './entities/job.entity';
import { InternalJob, InternalJobSchema } from './entities/internalJob.entity';
import { Company, CompanySchema } from 'src/companies/entities/company.entity';


@Module({
  imports:[MongooseModule.forFeature([
    {name:Job.name,schema:JobSchema},
    {name:InternalJob.name,schema:InternalJobSchema}, 
    {name:Company.name,schema:CompanySchema}])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

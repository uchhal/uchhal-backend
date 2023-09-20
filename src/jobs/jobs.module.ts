import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job,JobSchema } from './entities/job.entity';
import { InternalJob, InternalJobSchema } from './entities/internalJob.entity';


@Module({
  imports:[MongooseModule.forFeature([{name:Job.name,schema:JobSchema},{name:InternalJob.name,schema:InternalJobSchema}])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

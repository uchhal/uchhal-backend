import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job,JobSchema } from './entities/job.entity';


@Module({
  imports:[MongooseModule.forFeature([{name:Job.name,schema:JobSchema}])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

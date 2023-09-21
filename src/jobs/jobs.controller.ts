import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateInternalJobDto, CreateJobDescription, UserDataJobApply } from './dto/create-internalJob.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    console.log(createJobDto);
    return this.jobsService.create(createJobDto);
  }


  @Post("/internalJob")
  createinternalJob(@Body() data: {createinternalJobDto: CreateInternalJobDto, jobDescription:CreateJobDescription}) {
    console.log(data.createinternalJobDto);
    return this.jobsService.createinternalJob(data.createinternalJobDto, data.jobDescription);
  }

  @Get("/internalJob/:id")
  findOneJobDescription(@Param('id') id: string) {
    return this.jobsService.findOneJobDescription(id);
  }

  @Get()
  findAll(){
    return this.jobsService.findAll();
  }

  @Get('/internalJob')
  findAllInternalJobs(){
    return this.jobsService.findAllInternalJobs();
  }


  @Patch('/applyJob')
  applyJob( @Body() data:UserDataJobApply) {
    return this.jobsService.applyJob(data);
  }

  @Get('/appliedbyuser/:id')
  appliedByUser(@Param('id') id: string){
    return this.jobsService.appliedByUser(id);
  }

  @Get('/applieduserinjob/:id')
  appliedUserInJob(@Param('id') id: string){
    return this.jobsService.appliedUserInJob(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }

 
}

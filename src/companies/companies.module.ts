import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company, CompanySchema } from './entities/company.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:Company.name,schema:CompanySchema}])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}

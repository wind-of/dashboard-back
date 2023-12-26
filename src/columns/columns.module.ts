import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnsService } from "src/columns/columns.service";
import { Columns as ColumnsEntity } from "src/entities/column.entity";
import { ColumnsController } from "./columns.controller";
import { ParticipantsModule } from "src/participants/participants.module";

@Module({
	imports: [TypeOrmModule.forFeature([ColumnsEntity]), ParticipantsModule],
	providers: [ColumnsService],
	exports: [ColumnsService],
	controllers: [ColumnsController]
})
export class ColumnsModule {}

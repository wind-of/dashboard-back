import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnsService } from "src/columns/columns.service";
import { Columns as ColumnsEntity } from "src/entities/column.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ColumnsEntity])],
	providers: [ColumnsService],
	exports: [ColumnsService]
})
export class ColumnsModule {}

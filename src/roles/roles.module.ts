import { Module } from "@nestjs/common";
import { RolesService } from "src/roles/roles.service";
import { RolesController } from "src/roles/roles.controller";
import { Roles as RolesEntity } from "src/entities/roles.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([RolesEntity])],
	providers: [RolesService],
	controllers: [RolesController]
})
export class RolesModule {}

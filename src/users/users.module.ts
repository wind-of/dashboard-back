import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User as UserEntity } from "src/entities/users.entity";
import { UsersController } from "./users.controller";
import { ProjectModule } from "src/project/project.module";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), ProjectModule],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService]
})
export class UsersModule {}

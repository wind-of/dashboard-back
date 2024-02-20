import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Users as UserEntity } from "src/entities/users.entity";
import { UsersController } from "src/users/users.controller";
import { ProjectModule } from "src/project/project.module";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), ProjectModule],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService]
})
export class UsersModule {}

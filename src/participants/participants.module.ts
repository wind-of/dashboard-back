import { Module } from "@nestjs/common";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participants as ParticipantsEntity } from "src/entities/participants.entity";
import { Projects as ProjectsEntity } from "src/entities/projects.entity";
import { Users as UsersEntity } from "src/entities/users.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([ParticipantsEntity, ProjectsEntity, UsersEntity])
	],
	controllers: [ParticipantsController],
	providers: [ParticipantsService],
	exports: [ParticipantsService]
})
export class ParticipantsModule {}

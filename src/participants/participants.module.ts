import { Module } from "@nestjs/common";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participants as ParticipantsEntity } from "src/entities/participants.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ParticipantsEntity])],
	controllers: [ParticipantsController],
	providers: [ParticipantsService],
	exports: [ParticipantsService]
})
export class ParticipantsModule {}

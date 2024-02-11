import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	UseGuards,
	Patch
} from "@nestjs/common";
import { ProjectParticipantRoles as Roles } from "src/decorators/project-roles.decorator";
import { ParticipantRolesEnum as RolesEnum } from "src/participants/enums/roles.enum";
import { ColumnsService } from "src/columns/columns.service";
import { UpdateColumnDto } from "src/columns/dto/update-column.dto";
import { CreateColumnDto } from "src/columns/dto/create-column.dto";
import { DeleteColumnDto } from "src/columns/dto/delete-column.dto";
import { ParticipantRolesGuard } from "src/participants/guards/participant-roles.guard";
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { ColumnExistenceGuard } from "src/columns/guard/column-existence.guard";
import { UpdateColumnPositionDto } from "src/columns/dto/update-column-position.dto";

@Controller("columns")
@UseGuards(AuthenticatedGuard, ParticipantRolesGuard)
export class ColumnsController {
	constructor(private columnsService: ColumnsService) {}

	@Post()
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async createColumn(@Body() createColumnDto: CreateColumnDto) {
		return this.columnsService.create(createColumnDto);
	}

	@UseGuards(ColumnExistenceGuard)
	@Patch(":columnId")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async updateColumn(
		@Param("columnId") columnId: number,
		@Body() updateColumnDto: UpdateColumnDto
	) {
		return this.columnsService.update(columnId, {
			title: updateColumnDto.title
		});
	}

	@UseGuards(ColumnExistenceGuard)
	@Patch(":columnId/position")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async updateColumnPosition(
		@Param("columnId") columnId: number,
		@Body() updateColumnPositionDto: UpdateColumnPositionDto
	) {
		return this.columnsService.updateColumnPosition(
			columnId,
			updateColumnPositionDto.projectId,
			updateColumnPositionDto.position,
			updateColumnPositionDto.shouldInsertAfter
		);
	}

	@UseGuards(ColumnExistenceGuard)
	@Delete(":columnId")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async deleteColumn(
		@Param("columnId") columnId: number,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@Body() deleteColumnDto: DeleteColumnDto
	) {
		return this.columnsService.remove(columnId);
	}
}

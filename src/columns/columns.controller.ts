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
import { ProjectRolesGuard } from "src/guards/project-roles.guard";
import { AuthenticatedGuard } from "src/guards/authentication.guard";

@Controller("columns")
@UseGuards(AuthenticatedGuard, ProjectRolesGuard)
export class ColumnsController {
	constructor(private readonly columnsService: ColumnsService) {}

	@Post()
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async createColumn(@Body() createColumnDto: CreateColumnDto) {
		return this.columnsService.create(createColumnDto);
	}

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

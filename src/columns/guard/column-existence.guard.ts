import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable
} from "@nestjs/common";
import { ColumnsService } from "src/columns/columns.service";

@Injectable()
export class ColumnExistenceGuard implements CanActivate {
	constructor(@Inject(ColumnsService) private columnService: ColumnsService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const columnId = request.params?.columnId || request.body?.columnId;
		if (!columnId) throw new BadRequestException("Column ID is required");
		const column = await this.columnService.findBy({
			id: columnId
		});
		if (!column) throw new BadRequestException("Column not found");
		return true;
	}
}

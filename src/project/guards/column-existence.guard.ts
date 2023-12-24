import {
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
		const column = await this.columnService.findBy(request.params.columnId);
		return !!column;
	}
}

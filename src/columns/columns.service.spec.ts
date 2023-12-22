import { Test, TestingModule } from "@nestjs/testing";
import { ColumnsService } from "src/columns/columns.service";

describe("ColumnsService", () => {
	let service: ColumnsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ColumnsService]
		}).compile();

		service = module.get<ColumnsService>(ColumnsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});

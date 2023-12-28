import { Test, TestingModule } from "@nestjs/testing";
import { TagsController } from "src/tags/tags.controller";

describe("TagsController", () => {
	let controller: TagsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TagsController]
		}).compile();

		controller = module.get<TagsController>(TagsController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});

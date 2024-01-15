import { TagProto } from "./tag-proto";

export type TagCreateData =
	| (TagProto & { taskId: number })
	| (TagProto & { projectId: number });

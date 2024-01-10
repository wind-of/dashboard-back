import { ParticipantSearchCriteria } from "src/participants/types/participant-criteria";

export type ProjectSearchCriteria = {
	readonly ownerId?: number;
	readonly id?: number;
	readonly participants?: ParticipantSearchCriteria;
};

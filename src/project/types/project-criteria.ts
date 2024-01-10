import { ParticipantSearchCriteria } from "src/participants/types/participant-criteria";

export type SingleProjectSearchCriteria = {
	readonly ownerId?: number;
	readonly id?: number;
	readonly participants?: ParticipantSearchCriteria;
};

export type ProjectSearchCriteria =
	| SingleProjectSearchCriteria
	| SingleProjectSearchCriteria[];

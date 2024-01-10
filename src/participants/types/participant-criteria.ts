export type SingleParticipantSearchCriteria = {
	readonly id?: number;
	readonly projectId?: number;
	readonly userId?: number;
};

export type ParticipantSearchCriteria =
	| SingleParticipantSearchCriteria
	| SingleParticipantSearchCriteria[];

export const BCRYPT_ROUNDS = 10 as const;

export const DEFAULT_TAGS = [
	["Design", "#5051F9"],
	["Research", "#1EA7FF"],
	["Planning", "#E97342"],
	["Content", "#F59E0B"]
].map(([title, color]) => ({ title, color }));

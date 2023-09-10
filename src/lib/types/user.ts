export type UserId = string;

export type User = {
	id: UserId;
	username: string;
};

export function createNewUser(id?: UserId): User {
	return {
		id: id || crypto.randomUUID(),
		username: ''
	};
}

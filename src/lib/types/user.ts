export type User = {
	id: string;
	username: string;
};

export function createNewUser(id?: string): User {
	return {
		id: id || crypto.randomUUID(),
		username: ''
	};
}

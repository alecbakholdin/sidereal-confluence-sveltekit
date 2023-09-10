import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	const { gameState, user } = locals;
	if (!gameState) throw error(404, { message: 'Game does not exist' });
	if (!user) throw error(401, { message: 'User is not authenticated' });

	if (!user.username) {
        console.log("User's username is not set. Redirecting to setusername page");
		throw redirect(308, '/profile/setusername?redirect=' + url.pathname);
	}

	if (!gameState.players.includes(user.id)) {
		gameState.players.push(user.id);
	}
	gameState.usernameMap[user.id] = user.username;
    gameState.lobbyInfoMap[user.id] = gameState.lobbyInfoMap[user.id] || {}

	return {
		gameState
	};
}

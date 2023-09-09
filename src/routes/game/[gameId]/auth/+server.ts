import { pusher } from "$lib/objects.server.js";
import { error, json } from "@sveltejs/kit";

export async function POST({ request, locals }) {
    const body = await request.formData();
    const socketId = body.get('socket_id')?.toString();
    const channelName = body.get('channel_name')?.toString();
    if (!socketId || !channelName) throw error(400, { message: "missing socketId or channelName" });

    const { user, gameState } = locals;
    if (!user || !gameState) throw error(400, { message: 'User or game state not present' });
    if (gameState.players.includes(user.id)) {
        const authResponse = pusher.authorizeChannel(socketId, channelName, { user_id: user.id, user_info: user });
        return json(authResponse);
    }
    throw error(403, { message: "Not authorized" });
}
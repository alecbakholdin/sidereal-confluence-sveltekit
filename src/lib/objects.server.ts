import { PUSHER_SECRET } from "$env/static/private";
import { PUBLIC_PUSHER_APP_ID, PUBLIC_PUSHER_KEY, PUBLIC_PUSHER_CLUSTER } from "$env/static/public";
import Pusher from "pusher";

export const pusher = new Pusher({
	appId: PUBLIC_PUSHER_APP_ID,
	key: PUBLIC_PUSHER_KEY,
	secret: PUSHER_SECRET,
	cluster: PUBLIC_PUSHER_CLUSTER
});
import type { GameState } from '$lib/types/game';
import type { User } from '$lib/types/user';

declare global {
	// preserve any customizations you have here
	namespace App {
		interface Error {
			message: string;
		}
		interface Locals {
			gameState: GameState;
			user: User;
		}
		// interface PageData {}
		// interface Platform {}
	}

	// add these lines
	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}

	interface Document {
		startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
	}
}

export {};

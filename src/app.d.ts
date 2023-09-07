import type { GameState } from '$lib/types/game';

declare global {
	// preserve any customizations you have here
	namespace App {
		interface Error {
			message: string;
		}
		interface Locals {
			gameState: GameState;
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

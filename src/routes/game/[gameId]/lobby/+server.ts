import { json } from '@sveltejs/kit';

export async function POST({locals: {gameState}}) {
    gameState.state = gameState.state === 'lobby' ? 'inProgress' : 'lobby';
    return json({message: 'success'});
}
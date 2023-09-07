import { json } from '@sveltejs/kit';

export async function POST({locals}) {
    const {gameState} = locals;
    gameState.state = gameState.state === 'lobby' ? 'inProgress' : 'lobby';
    return json({message: 'success'});
}
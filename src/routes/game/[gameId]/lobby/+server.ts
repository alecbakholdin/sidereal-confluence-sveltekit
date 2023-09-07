import { json } from '@sveltejs/kit';

export async function POST({locals}) {
    const {gameState} = locals;
    console.log(gameState);
    gameState.state = gameState.state === 'lobby' ? 'inProgress' : 'lobby';
    console.log(gameState);
    return json({message: 'success'});
}
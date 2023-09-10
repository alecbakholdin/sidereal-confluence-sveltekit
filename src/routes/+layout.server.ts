export async function load({ locals: { user } }) {
    return { me: user }
}
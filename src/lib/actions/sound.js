/** @type {import("svelte/action").Action<HTMLElement, {events: Array<keyof HTMLElementEventMap>, src: string}>} */
export function sound(node, parameters) {
    // the node has been mounted in the DOM
    const sound = new Audio(parameters.src);
    function startSound() {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
    for(const event of parameters.events) {
        node.addEventListener(event, startSound);
    }

    return {
        destroy() {
            for(const event of parameters.events) {
                node.removeEventListener(event, startSound);
            }
        }
    };
}
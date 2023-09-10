/** @type {import("svelte/action").Action<HTMLInputElement, {events: Array<keyof HTMLElementEventMap>} | undefined>} */
export function highlight(node, parameters) {
	function selectAll() {
		node.setSelectionRange(0, node.value.length);
	}
	const events = parameters?.events || ['onfocus'];
	events.forEach((e) => node.addEventListener(e, selectAll));
	return {
		destroy: () => events.forEach((e) => node.removeEventListener(e, selectAll))
	};
}

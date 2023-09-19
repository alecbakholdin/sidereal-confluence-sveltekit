import { tick } from "svelte";
import type { EasingFunction, TransitionConfig } from "svelte/transition";

export function viewTransitionEvent<T extends (...args: any[]) => any, A extends Parameters<T>>(fn: (...args: A) => unknown): (...args: A) => unknown {
    if (typeof window === 'undefined' || !document.startViewTransition) {
        return fn;
    }
    return (...args: A) => document.startViewTransition(async () => {
        await fn(...args);
        await tick();
    })
}

export const collapse =
    (prop: 'height' | 'width' | 'both') =>
        (x: Element, opts?: { delay?: number; duration?: number; easing?: EasingFunction }) =>
        ({
            css: (t) => {
                console.log((x as HTMLElement).clientHeight)
                const widthScaling =
                    prop !== 'height' ? `width: ${(x instanceof HTMLElement ? x.offsetWidth : 0) * t}px; min-width: 0; ` : '';
                const heightScaling =
                    prop !== 'width' ? `height: ${(x instanceof HTMLElement ? x.offsetHeight : 0) * t}px; min-height: 0; ` : '';
                return widthScaling + heightScaling + 'overflow: hidden;';
            },
            duration: 100,
            ...opts
        } as TransitionConfig);
export const collapseWidth = collapse('width');
export const collapseHeight = collapse('height');
export const collapseBoth = collapse('both');

import {writable} from 'svelte/store';

export const mouse = writable({
    x:0,
    y:0
})

export const innerWidth = writable(0);
export const innerHeight = writable(0);
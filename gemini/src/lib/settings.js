import { writable } from 'svelte/store';

export const GEMINI = "gemini";
export const TF = "tf";

export const aiParams = writable({mode: "", model: null});

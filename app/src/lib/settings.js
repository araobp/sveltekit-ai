import { writable } from 'svelte/store';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { updated } from "$app/state";
import { onMount } from "svelte";

const GEMINI_API_KEY_STORAGE_KEY = "gemini-api-key";

export const GEMINI = "gemini";
export const TF = "tf";

export const geminiModel = writable(null);

export const getApiKeyFromLocalStrage = () => localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);

export const setModel = (apiKey) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    geminiModel.set(genAI.getGenerativeModel({ model: "gemini-2.0-flash" }));
};

export const saveApiKey = (apiKey) => {
    localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, apiKey);
    setModel(apiKey);
};

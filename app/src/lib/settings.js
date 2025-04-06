import { writable } from 'svelte/store';

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from 'openai';


import { updated } from "$app/state";
import { onMount } from "svelte";

const GEMINI_API_KEY_STORAGE_KEY = "gemini-api-key";
const OPENAI_API_KEY_STORAGE_KEY = "openai-api-key";

export const GEMINI = "gemini";
export const OPENAI = "openai";

export const TF = "tf";

export const geminiAPI = writable(null);
export const openaiAPI = writable(null);

const KEY = {
    [GEMINI]: GEMINI_API_KEY_STORAGE_KEY,
    [OPENAI]: OPENAI_API_KEY_STORAGE_KEY
}

export const getApiKeyFromLocalStrage = service => {
    return localStorage.getItem(KEY[service]);
};

export const setModel = (apiKey, service) => {
    if (service === GEMINI) {
        const genAI = new GoogleGenerativeAI(apiKey);
        geminiAPI.set(genAI.getGenerativeModel({ model: "gemini-2.0-flash" }));
    } else if (service === OPENAI) {
        openaiAPI.set(new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true,  // Allow browser usage
        }));
    }
};

export const saveApiKey = (apiKey, service) => {
    localStorage.setItem(KEY[service], apiKey);
    setModel(apiKey, service);
    console.log(KEY[service], apiKey);;
};

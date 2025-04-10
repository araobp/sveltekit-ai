import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import { GoogleGenerativeAI } from "@google/generative-ai";


import { updated } from "$app/state";
import { onMount } from "svelte";

const GEMINI_API_KEY_STORAGE_KEY = "gemini-api-key";

export const [GEMINI, TF] = ["gemini", "tf"];
export const [IMAGE, CAMERA] = ["image", "camera"];

export const geminiAPI = writable(null);

const KEY = {
    [GEMINI]: GEMINI_API_KEY_STORAGE_KEY,
}

export const getApiKeyFromLocalStrage = service => {
    if (browser) {
        return localStorage.getItem(KEY[service]);
    } else {
        return null;
    }
};

export const setModel = (apiKey, service) => {
    if (service === GEMINI) {
        const genAI = new GoogleGenerativeAI(apiKey);
        geminiAPI.set(genAI.getGenerativeModel({ model: "gemini-2.0-flash" }));
    }
};

export const saveApiKey = (apiKey, service) => {
    if (browser) {
        localStorage.setItem(KEY[service], apiKey);
        setModel(apiKey, service);
        console.log(KEY[service], apiKey);;
    }
};

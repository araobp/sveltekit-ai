<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    var { children } = $props();

    import { aiParams, GEMINI, TF } from "$lib/settings";
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { browser } from "$app/environment";
    import { updated } from "$app/state";
    import { onMount } from "svelte";

    // AI mode
    var s_AiMode = $state();

    const GEMINI_API_KEY_STORAGE_KEY = "gemini-api-key";

    const getModel = (apiKey) => {
        const genAI = new GoogleGenerativeAI(apiKey);
        $aiParams.model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    };

    const setApiKey = (apiKey) => {
        localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, apiKey);
        getModel(apiKey);
    };

    $effect(() => {
        $aiParams.mode = s_AiMode;
    });

    if (browser) {
        const apiKey = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);
        if (apiKey !== null) {
            getModel(apiKey);
        }
    };

    $aiParams.mode = GEMINI;

</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <span class="navbar-brand" href="#">Gemini</span>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/image_recognition"
                        >Image Recognition</a
                    >
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/object_detection"
                        >Object Detection</a
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container mb-3">
    <div class="d-flex align-items-center mt-3">
        <select class="form-select" style="width: 10rem;" bind:value={s_AiMode}>
            <option value={GEMINI} selected>Gemini</option>
            <option value={TF}>TensorFlow</option>
        </select>

        <div class={s_AiMode === "gemini" ? "input-group w-50 ms-3" : "d-none"}>
            <span class="input-group-text" id="">Gemini API Key</span>
            <input
                type="text"
                class="form-control"
                onchange={(e) => setApiKey(e.target.value)}
                value={getApiKeyFromLocalStrage()}
            />
        </div>
    </div>
    <br>
    {@render children()}
</div>

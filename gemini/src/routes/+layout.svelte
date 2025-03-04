<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    var { children } = $props();

    import { model } from "$lib/settings";
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { browser } from "$app/environment";

    const GEMINI_API_KEY_STORAGE_KEY = "gemini-api-key";

    const getApiKeyFromLocalStrage = () => {
        if (browser) {
            return localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);
        } else {
            return null;
        }
    };

    const setModel = (apiKey) => {
        const genAI = new GoogleGenerativeAI(apiKey);
        $model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    };

    const setApiKey = (apiKey) => {
        localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, apiKey);
        setModel(apiKey);
    };

    if (browser) {
        const apiKey = getApiKeyFromLocalStrage();
        if (apiKey !== null) {
            setModel(apiKey);  
        }
    };
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <span class="navbar-brand" href="#">Gemini</span>
        <div class="collapse navbar-collapse" id="navbarNav">
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
    <div class="input-group w-50 mt-3">
        <span class="input-group-text" id="">Gemini API Key</span>
        <input
            type="text"
            class="form-control"
            onchange={(e) => setApiKey(e.target.value)}
            value={getApiKeyFromLocalStrage()}
        />
    </div>
    
    {@render children()}
</div>

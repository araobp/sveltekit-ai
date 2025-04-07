<script>
    import { GEMINI, getApiKeyFromLocalStrage, setModel } from "$lib/settings";
    import "bootstrap/dist/css/bootstrap.min.css";
    import { onMount } from "svelte";
    var { children } = $props();

    // Instantiate Gemini model
    onMount(() => {
        const apiKey = getApiKeyFromLocalStrage(GEMINI);
        if (apiKey) {
            setModel(apiKey, GEMINI);
        }
    });
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <span class="navbar-brand" href="#">Learning SvelteKit</span>
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
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/tts"
                        >Text-to-Speech</a
                    >
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/ai_robot"
                        >AI Robot</a
                    >
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/settings">Settings</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container mb-3">
    {@render children()}
</div>

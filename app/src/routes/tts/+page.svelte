<script>
    import OpenAI from "openai";
    import { WavStreamPlayer } from "wavtools";

    import { onMount } from "svelte";
    import { on } from "svelte/events";
    import { equalConfig } from "@tensorflow/tfjs-backend-cpu/dist/kernels/Equal";

    const VOICES = {
        alloy: "Alloy",
        ash: "Ash",
        ballad: "Ballad",
        coral: "Coral",
        echo: "Echo",
        fable: "Fable",
        onyx: "Onyx",
        nova: "Nova",
        sage: "Sage",
        shimmer: "Shimmer"
    }

    const speak = async text => {
        if (text && text.length > 0) {
            const response =  await fetch(`/api/tts?text=${text}`, {
                    method: 'POST',
                });
            const json = await response.json();
            console.log(response.status, json.text);
        }
    }

    onMount(async() => {
        await speak();
    });
</script>

<div>
    <h1>Text-to-Speech (OpenAI)</h1>

    <p>Note: Text-to-Speech runs on the server side. The environment variable "OPENAI_API_KEY" must be set, and ffmpeg needs to be installed. If you are on a Mac, you can install ffmpeg using "brew install ffmpeg".</p>

    <div class="d-flex align-items-center mt-3">
        <div class="me-1">Voice: </div>
        <select class="form-select w-25">
            {#each Object.keys(VOICES) as voice}
                <option value={voice}>{VOICES[voice]}</option>
            {/each}
        </select>
    </div>

    <input
        type="text"
        class="form-control mt-2"
        placeholder="Enter text to speak"
        onchange={e => {
            speak(e.target.value);
            e.target.value = "";
            }
        }
    />
</div>

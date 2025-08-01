<script>
    import { onMount } from "svelte";
    import { EMOTIONS } from "$lib/emotions";
    
    var s_Voice = $state();
    var s_Emotion = $state();
    var s_Text = $state();

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
        shimmer: "Shimmer",
    };

    const speak = async () => {
        if (s_Text !== "") {
            const response = await fetch(
                `/api/openai/speech?text=${s_Text}&voice=${s_Voice}&emotion=${s_Emotion}`,
                {
                    method: "POST",
                },
            );
            const json = await response.json();
            //console.log(response.status, json.text);
            s_Text = "";
        }
    };
</script>

<div>
    <h3>Speech (OpenAI)</h3>

    <p>
        Note: Text-to-Speech runs on the server side. The environment variable
        "OPENAI_API_KEY" must be set, and ffmpeg needs to be installed. If you
        are on a Mac, you can install ffmpeg using "brew install ffmpeg".
    </p>

    <div class="d-flex align-items-center mt-3">
        <div class="me-1">Voice:</div>
        <select class="form-select w-25" bind:value={s_Voice}>
            {#each Object.keys(VOICES) as voice}
                <option value={voice}>{VOICES[voice]}</option>
            {/each}
        </select>
        <div class="ms-3 me-1">Emotion:</div>
        <select class="form-select w-25" bind:value={s_Emotion}>
            {#each Object.keys(EMOTIONS) as emotion}
                <option value={emotion}>{emotion}</option>
            {/each}
        </select>
    </div>

    <div class="d-flex align-items-center mt-2">
        <input
            type="text"
            class="form-control w-100"
            placeholder="Enter text..."
            bind:value={s_Text}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    speak();
                }
            }}
        />
        <button class="btn btn-primary ms-2" onclick={speak}> Speak </button>
    </div>
</div>

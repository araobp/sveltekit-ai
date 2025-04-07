<script>
    import { onMount } from "svelte";

    var s_OpMode = $state();

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
            const response =  await fetch(`/api/speech?text=${text}`, {
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
    <h1>Speech (OpenAI)</h1>

    <p>Note: Text-to-Speech runs on the server side. The environment variable "OPENAI_API_KEY" must be set, and ffmpeg needs to be installed. If you are on a Mac, you can install ffmpeg using "brew install ffmpeg".</p>

    <div class="d-flex align-items-center mt-3">
        <div class="me-1">Operation Mode: </div>
        <select class="form-select w-25" bind:value={s_OpMode}>
            <option value="tts">Text-to-Speech</option>
            <option value="chat">Chat Completion</option>
        </select>
    
        <div class="ms-3 me-1">Voice: </div>
        <select class="form-select w-25">
            {#each Object.keys(VOICES) as voice}
                <option value={voice}>{VOICES[voice]}</option>
            {/each}
        </select>
    </div>

    <input
        type="text"
        class="form-control mt-2"
        placeholder="Enter text..."
        onchange={e => {
            speak(e.target.value);
            e.target.value = "";
            }
        }
    />
</div>

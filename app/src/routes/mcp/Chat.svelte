<script>
    import { generateContent } from "$lib/genAiClient";

    var s_Text = $state();
    var s_Result = $state("...");

    const send = async (text) => {
        s_Result = "...";
        const prompt = `${s_Text}`;
        s_Result = await generateContent(prompt, null, true);
    };
</script>

<div>
    <div class="d-flex align-items-center mt-2">
        <input
            type="text"
            class="form-control w-100"
            placeholder="Enter text..."
            bind:value={s_Text}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    send();
                }
            }}
        />
        <button class="btn btn-primary ms-2" onclick={send}>
            Send
        </button>
    </div>

    <textarea class="w-100 mt-2 rounded border p-2" rows="6" bind:value={s_Result}
    ></textarea>
</div>

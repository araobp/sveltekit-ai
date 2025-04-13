<script>
    import { geminiAPI } from "$lib/settings";

    var s_Text = $state();
    var s_Lang = $state();
    var s_Result = $state("...");

    const translate = async (text) => {
        s_Result = "...";
        const prompt = `Translate the following text to ${s_Lang}.
        
        ${s_Text}
        `;
        const result = await $geminiAPI.generateContent(prompt);
        s_Result = result.response.text();
    };
</script>

<div>
    <h3>Translation (Gemini)</h3>

    <select class="form-select w-25 mt-3" bind:value={s_Lang}>
        <option value="Japanese">to Japanese</option>
        <option value="English" selected>to English</option>
    </select>

    <div class="d-flex align-items-center mt-2">
        <input
            type="text"
            class="form-control w-100"
            placeholder="Enter text..."
            bind:value={s_Text}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    translate();
                }
            }}
        />
        <button class="btn btn-primary ms-2" onclick={translate}>
            Translate
        </button>
    </div>

    <textarea class="w-100 mt-2 rounded border p-2" rows="6" bind:value={s_Result}
    ></textarea>
</div>

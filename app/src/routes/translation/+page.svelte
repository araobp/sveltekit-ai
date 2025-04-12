<script>
    var s_Text = $state();

    const translate = (text) => {


        s_Text = "";
    };
</script>

<div>
    <h3>Translation (Gemini)</h3>

    <select class="form-select w-25 mt-3">
        <option value="e_to_j">English to Japanese</option>
        <option value="j_to_e">Japanese to English</option>
    </select>

    <div class="d-flex align-items-center mt-2">
        <input
            type="text"
            class="form-control w-100"
            placeholder="Enter text..."
            bind:value={s_Text}
            onkeypress={e => {
                if (e.key === 'Enter') {
                    speak();
                }
            }}

/>
        <button class="btn btn-primary ms-2" onclick={translate}>
            Speak
        </button>
    </div>
</div>

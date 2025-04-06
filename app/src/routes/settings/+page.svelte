<script>
    import { saveApiKey, getApiKeyFromLocalStrage } from "$lib/settings";
</script>

<div class="container mb-3">
    <div class="d-flex align-items-center mt-3">
        <div class="input-group w-50 ms-3">
            <span class="input-group-text" id="">Gemini API Key</span>
            <input
                type="text"
                class="form-control"
                onchange={(e) => saveApiKey(e.target.value)}
                value={getApiKeyFromLocalStrage()}
            />
        </div>
    </div>
    <br>
</div>

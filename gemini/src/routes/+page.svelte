<script>
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import showdown from "showdown";
    import { onMount } from "svelte";
    import "bootstrap/dist/css/bootstrap.min.css";

    import DropImage from "$lib/DropImage.svelte";
    import MessageModal from "$lib/MessageModal.svelte";
    import { SPINNER } from "$lib/bootstrap-html";

    var ApiKeyInput;
    var s_GeminiApiKey = $state("");
    const GEMINI_API_KEY_STORAGE_KEY = "gemini-api-key";

    var s_Modal = $state();

    onMount(() => {
        ApiKeyInput.onchange = (e) => {
            const apiKey = e.target.value;
            localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, apiKey);
            s_GeminiApiKey = e.target.value;
        };

        const apiKey = localStorage.getItem("gemini-api-key");
        if (apiKey !== null) {
            ApiKeyInput.value = apiKey;
            s_GeminiApiKey = apiKey;
        }
    });

    var model = $derived.by(() => {
        const genAI = new GoogleGenerativeAI(s_GeminiApiKey);
        return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    });

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const DEFAULT_IMAGE = "/favicon.png";

    var s_Answer = $state();

    const converter = new showdown.Converter();

    const generateContentWithGemini = async (b64Image, prompt) => {
        const data = b64Image.split(",")[1].trim();
        const mimeType = b64Image.split(";")[0].split(":")[1];

        const result = await model.generateContent([
            {
                inlineData: {
                    data: data,
                    mimeType: mimeType,
                },
            },
            prompt,
        ]);

        return result.response.text();
    };

    const describe = async (b64Image) => {
        s_Modal.show();
        s_Answer = "";
        const answer = await generateContentWithGemini(
            b64Image,
            "Describe the image",
        );
        s_Answer = converter.makeHtml(answer);
        s_Modal.hide();
    };
</script>

<div class="container">
    <h1>Image Recognition with Gemini</h1>

    <div class="input-group w-50 mt-3">
        <span class="input-group-text" id="">Gemini API Key</span>
        <input type="text" class="form-control" bind:this={ApiKeyInput} />
    </div>

    <div class="d-flex mt-3">
        <div class="w-25 p-2">
            <DropImage
                maxSize={MAX_SIZE}
                defaultImage{DEFAULT_IMAGE}
                callback={describe}
            ></DropImage>
        </div>
        <div class="w-75 p-2">
            {@html s_Answer}
        </div>
    </div>
</div>

<MessageModal title="Processing..." innerHTML={SPINNER} bind:modal={s_Modal}></MessageModal>

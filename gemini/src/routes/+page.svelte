<script>
    import { PUBLIC_GEMINI_API_KEY } from "$env/static/public";
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import showdown from "showdown";
    import { onMount } from "svelte";

    const genAI = new GoogleGenerativeAI(PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const describeImageWithGemini = async (b64Image) => {
        const data = b64Image.split(",")[1].trim();
        const mimeType = b64Image.split(";")[0].split(":")[1];

        const result = await model.generateContent([
            {
                inlineData: {
                    data: data,
                    mimeType: mimeType,
                },
            },
            "Describe the image",
        ]);

        return result.response.text();
    };

    // Drag and Drop an image
    // Reference: https://transloadit.com/devtips/implementing-file-uploads-with-bootstrap-5/
    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    var DropZone;
    var FileInput;
    var ErrorMessage;
    var Img;
    var GeneratingSpinner;

    var s_Answer = $state("");

    const converter = new showdown.Converter();

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    onMount(() => {
        Img.ondragover = (e) => {
            e.preventDefault();
            Img.classList.add("bg-light");
        };

        Img.ondragleave = (e) => {
            Img.classList.remove("bg-light");
        };

        Img.ondrop = async (e) => {
            e.preventDefault();
            Img.classList.remove("bg-light");
            ErrorMessage.classList.add("d-none");

            try {
                const file = e.dataTransfer.files[0];
                if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                    throw new Error(
                        "Invalid file type. Please upload JPEG or PNG.",
                    );
                }
                if (file.size > MAX_SIZE) {
                    throw new Error("File too large. Maximum size is 5MB.");
                }
                FileInput.files = e.dataTransfer.files;
                const b64Image = await toBase64(FileInput.files[0]);
                Img.src = b64Image;
                s_Answer = ""
                GeneratingSpinner.classList.remove("d-none");
                const answer = await describeImageWithGemini(b64Image);
                s_Answer = converter.makeHtml(answer);
                GeneratingSpinner.classList.add("d-none");
            } catch (error) {
                ErrorMessage.textContent = error.message;
                ErrorMessage.classList.remove("d-none");
            }
        };
    });
</script>

<div class="container">
    <h1>Gemini 1.5 Flash</h1>

    <div class="d-flex mt-3">
        <div class="w-25">
            <!-- svelte-ignore a11y_missing_attribute -->
            <img bind:this={Img} src="/favicon.png" class="w-100 p-2" />
            <div
                bind:this={ErrorMessage}
                class="alert alert-danger d-none mt-2"
            ></div>
            <input
                type="file"
                class="d-none"
                accept="image/jpeg,image/png"
                bind:this={FileInput}
            />
        </div>

        <div class="w-75 p-2">
            {@html s_Answer}
            <div class="spinner-border d-none" role="status" bind:this={GeneratingSpinner}>
                <span class="visually-hidden">Loading...</span>
            </div>            
        </div>
    </div>
</div>

<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
</style>

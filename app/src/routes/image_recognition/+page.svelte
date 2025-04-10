<script>
    // Settings
    import { geminiAPI, GEMINI, TF, IMAGE, CAMERA } from "$lib/settings";

    // TensorFrlow.js
    import * as tf from "@tensorflow/tfjs";
    import * as mobilenet from "@tensorflow-models/mobilenet";

    import DropImage from "$lib/DropImage.svelte";
    import MessageModal from "$lib/MessageModal.svelte";
    import ImageProcessingMode from "$lib/ImageProcessingMode.svelte";
    import { SPINNER } from "$lib/bootstrap-html";
    import { round } from "$lib/utils";

    import showdown from "showdown";
    import CaptureMode from "$lib/CaptureMode.svelte";
    import Camera from "$lib/Camera.svelte";

    var s_Modal = $state();

    var s_ProcessingMode = $state();
    var s_CaptureMode = $state();
    var s_Video = $state();

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const DEFAULT_IMAGE = "/favicon.png";

    var s_Answer = $state();

    const converter = new showdown.Converter();

    const generateContentWithGemini = async (b64Image, prompt) => {
        const data = b64Image.split(",")[1].trim();
        const mimeType = b64Image.split(";")[0].split(":")[1];

        const result = await $geminiAPI.generateContent([
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

    const describe = async (b64Image, imageElm) => {
        s_Modal.show();
        s_Answer = "";

        if (s_ProcessingMode === GEMINI) {
            const answer = await generateContentWithGemini(
                b64Image,
                "Describe the image",
            );
            s_Answer = converter.makeHtml(answer);
        } else if (s_ProcessingMode === TF) {
            const model = await mobilenet.load();
            s_Answer = await model.classify(imageElm);
        }

        s_Modal.hide();
    };

    $effect(() => {
        s_ProcessingMode;
        s_Answer = "";
    });
</script>

<h3>Image Recognition</h3>

<ImageProcessingMode bind:mode={s_ProcessingMode}></ImageProcessingMode>
<CaptureMode bind:mode={s_CaptureMode}></CaptureMode>

<div class="d-flex mt-2">
    <div class="w-25 p-2">
        <div class={s_CaptureMode === IMAGE ? "d-inline" : "d-none"}>
            <DropImage
                maxSize={MAX_SIZE}
                defaultImage{DEFAULT_IMAGE}
                callback={describe}
            ></DropImage>
        </div>
        <!-- svelte-ignore a11y_media_has_caption -->
        <div class="w-100 {s_CaptureMode === CAMERA ? 'd-inline' : 'd-none'}">
            <Camera
                active={s_CaptureMode === CAMERA}
                callback={describe}
            ></Camera>
        </div>
    </div>
    <div class="w-75 p-2">
        <div class={s_ProcessingMode === GEMINI ? "d-inline" : "d-none"}>
            {@html s_Answer}
        </div>
        <div class={s_ProcessingMode === TF ? "d-inline" : "d-none"}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Class Name</th>
                        <th scope="col" class="text-end">Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {#each s_Answer as answer, idx}
                        <tr>
                            <th scope="row">{idx + 1}</th>
                            <td>{answer.className}</td>
                            <td class="text-end"
                                >{round(answer.probability * 100.0, 1)}%</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<MessageModal title="Processing..." innerHTML={SPINNER} bind:modal={s_Modal}
></MessageModal>

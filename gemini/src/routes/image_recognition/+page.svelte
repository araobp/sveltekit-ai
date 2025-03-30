<script>
    import { GoogleGenerativeAI, HarmProbability } from "@google/generative-ai";
    import { aiParams, GEMINI, TF } from "$lib/settings";
    import showdown from "showdown";

    import DropImage from "$lib/DropImage.svelte";
    import MessageModal from "$lib/MessageModal.svelte";
    import { SPINNER } from "$lib/bootstrap-html";
    import { round } from "$lib/utils";

    import * as tf from "@tensorflow/tfjs";
    import * as mobilenet from "@tensorflow-models/mobilenet";

    var s_Modal = $state();

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const DEFAULT_IMAGE = "/favicon.png";

    var s_Answer = $state();

    const converter = new showdown.Converter();

    const generateContentWithGemini = async (b64Image, prompt) => {
        const data = b64Image.split(",")[1].trim();
        const mimeType = b64Image.split(";")[0].split(":")[1];

        const result = await $aiParams.model.generateContent([
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

        if ($aiParams.mode === GEMINI) {
            const answer = await generateContentWithGemini(
                b64Image,
                "Describe the image",
            );
            s_Answer = converter.makeHtml(answer);
        } else if ($aiParams.mode === TF) {
            const model = await mobilenet.load();
            s_Answer = await model.classify(imageElm);
        }
        
        s_Modal.hide();
    };

    $effect(() => {
        $aiParams.mode;
        s_Answer = "";
    });
</script>

<h1>Image Recognition</h1>

<div class="d-flex mt-3">
    <div class="w-25 p-2">
        <DropImage
            maxSize={MAX_SIZE}
            defaultImage{DEFAULT_IMAGE}
            callback={describe}
        ></DropImage>
    </div>
    <div class="w-75 p-2">
        <div class={$aiParams.mode === GEMINI ? "d-inline" : "d-none"}>
            {@html s_Answer}
        </div>
        <div class={$aiParams.mode === TF ? "d-inline" : "d-none"}>
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

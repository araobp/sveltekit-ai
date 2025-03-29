<script>
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { aiParams, GEMINI, TF } from "$lib/settings";
    import showdown from "showdown";

    import DropImage from "$lib/DropImage.svelte";
    import MessageModal from "$lib/MessageModal.svelte";
    import { SPINNER } from "$lib/bootstrap-html";

    import * as tf from '@tensorflow/tfjs';
    import * as mobilenet from '@tensorflow-models/mobilenet';

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
        console.log(aiParams)
        if ($aiParams.mode === GEMINI) {
            const answer = await generateContentWithGemini(
                b64Image,
                "Describe the image",
            );
            s_Answer = converter.makeHtml(answer);
        } else if ($aiParams.mode === TF) {
            console.log("loading...")
            const model = await mobilenet.load();
            const result = await model.classify(imageElm);
            console.log(result);
        }

        s_Modal.hide();
    };
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
        {@html s_Answer}
    </div>
</div>

<MessageModal title="Processing..." innerHTML={SPINNER} bind:modal={s_Modal}
></MessageModal>

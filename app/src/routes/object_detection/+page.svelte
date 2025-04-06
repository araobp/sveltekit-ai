<script>
    // Settings
    import { geminiAPI, GEMINI, TF } from "$lib/settings";

    // TensorFlow.js
    import * as tf from "@tensorflow/tfjs";
    import * as cocoSsd from "@tensorflow-models/coco-ssd";

    import DropImage from "$lib/DropImage.svelte";
    import MessageModal from "$lib/MessageModal.svelte";
    import ImageProcessingMode from "$lib/ImageProcessingMode.svelte";
    import { SPINNER } from "$lib/bootstrap-html";
    import { browser } from "$app/environment";
    import { drawBoundingBoxes } from "./bounding_boxes";
    import { round } from "$lib/utils";

    import showdown from "showdown";

    var s_Modal = $state();
    var s_Mode = $state();

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

    const detect = async (b64Image, _) => {
        const parse = (text) => {
            // Attempt to find JSON arrays
            const arrayStart = text.indexOf("[");
            const arrayEnd = text.lastIndexOf("]");

            if (arrayStart !== -1 && arrayEnd !== -1 && arrayStart < arrayEnd) {
                const jsonArrayString = text.substring(
                    arrayStart,
                    arrayEnd + 1,
                );
                return JSON.parse(jsonArrayString);
            } else {
                return null;
            }
        };

        s_Answer = "";

        var answer;
        var result;

        const imgDiv = document.getElementById("image");
        imgDiv.innerHTML = "";

        const img = document.createElement("img");
        img.src = b64Image;


        if (s_Mode === GEMINI) {
            s_Modal.show();

            answer = await generateContentWithGemini(
                b64Image,
                `
            Return bounding boxes for all objects (including persons and animals) in the image.

            If a group of the same type of objects is clustered together, separate the individual objects and output bounding boxes.

            If the object is an animal, output the kind of animal.

            Output data only without any extra explanations about the output.
            `,
            );
            result = parse(answer);
            s_Modal.hide();
        } else if (s_Mode === TF) {
            const model = await cocoSsd.load();
            answer = await model.detect(img, 20, 0.3);
            result = answer.map((e) => ({
                box_2d: [
                    round(e.bbox[1], 2),
                    round(e.bbox[0], 2),
                    round(e.bbox[1] + e.bbox[3], 2),
                    round(e.bbox[0] + e.bbox[2], 2),
                ],
                label: e.class,
                score: round(e.score, 2),
            }));
            answer = JSON.stringify(result);
        }

        imgDiv.appendChild(img);
        s_Answer = converter.makeHtml(answer);
        drawBoundingBoxes(img, result, s_Mode);
        
    };
</script>

<h1>Object Detection</h1>

<ImageProcessingMode bind:mode={s_Mode} ></ImageProcessingMode>

<div class="d-flex mt-3">
    <div class="w-25 p-2">
        <DropImage
            maxSize={MAX_SIZE}
            defaultImage{DEFAULT_IMAGE}
            callback={detect}
        ></DropImage>
    </div>
    <div class="w-75 p-2">
        {@html s_Answer}
    </div>
</div>

<!-- svelte-ignore a11y_missing_attribute -->
<div id="image"></div>

<MessageModal title="Processing..." innerHTML={SPINNER} bind:modal={s_Modal}
></MessageModal>

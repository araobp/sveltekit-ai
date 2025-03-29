<script>
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { aiParams } from "$lib/settings";
    import showdown from "showdown";

    import DropImage from "$lib/DropImage.svelte";
    import MessageModal from "$lib/MessageModal.svelte";
    import { SPINNER } from "$lib/bootstrap-html";
    import { browser } from "$app/environment";
    import { drawBoundingBoxes } from "./bounding_boxes";

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

    const detect = async (b64Image) => {

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

        s_Modal.show();
        s_Answer = "";
        const answer = await generateContentWithGemini(
            b64Image,
            `
            Return bounding boxes for all objects (including persons and animals) in the image.

            If a group of the same type of objects is clustered together, separate the individual objects and output bounding boxes.

            If the object is an animal, output the kind of animal.

            Output data only without any extra explanations about the output.
            `,
        );
        s_Answer = converter.makeHtml(answer);
        s_Modal.hide();

        const result = parse(s_Answer);
        console.log(parse(s_Answer));

        const imgDiv = document.getElementById("image");
        imgDiv.innerHTML = "";

        const img = document.createElement("img");
        img.src = b64Image;
        imgDiv.appendChild(img);

        drawBoundingBoxes(img, result);

    };
</script>

<h1>Object Detection</h1>

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

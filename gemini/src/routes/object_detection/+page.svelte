<script>
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { model } from "$lib/settings";
    import showdown from "showdown";

    import DropImage from "$lib/DropImage.svelte";
    import MessageModal from "$lib/MessageModal.svelte";
    import { SPINNER } from "$lib/bootstrap-html";

    var s_Modal = $state();

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const DEFAULT_IMAGE = "/favicon.png";

    var s_Answer = $state();

    const converter = new showdown.Converter();

    const generateContentWithGemini = async (b64Image, prompt) => {
        const data = b64Image.split(",")[1].trim();
        const mimeType = b64Image.split(";")[0].split(":")[1];

        const result = await $model.generateContent([
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
        s_Modal.show();
        s_Answer = "";
        const answer = await generateContentWithGemini(
            b64Image,
            `
            Return bounding boxes for all objects in the image in the following format as a list: [ymin, xmin, ymax, xmax, object_name].
            If there are more than one object, return separate lists for each object."
            `,
        );
        s_Answer = converter.makeHtml(answer);
        s_Modal.hide();
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

<MessageModal title="Processing..." innerHTML={SPINNER} bind:modal={s_Modal}
></MessageModal>

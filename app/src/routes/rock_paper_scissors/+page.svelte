<script>
    import { generateContent } from "$lib/api";
    import { sleep } from "$lib/utils";

    import MessageModal from "$lib/MessageModal.svelte";
    import { SPINNER } from "$lib/bootstrap-html";

    import Camera from "$lib/Camera.svelte";

    const START_IMAGE_SEQUENCE = [
        "/hand_gesture/start.jpg",
        "/hand_gesture/three.jpg",
        "/hand_gesture/two.jpg",
        "/hand_gesture/one.jpg",
    ];

    const YOU_IMAGE = "/hand_gesture/you.jpg";

    const HAND_GESTURES = {
        rock: "/hand_gesture/rock.jpg",
        paper: "/hand_gesture/paper.jpg",
        scissors: "/hand_gesture/scissors.jpg",
    };

    var s_Modal = $state();

    var s_Capture = $state();

    var s_MeImage = $state(START_IMAGE_SEQUENCE[0]);
    var s_YouImage = $state(YOU_IMAGE);

    var s_Winner = $state("...");

    const start = async () => {
        const choose = () => {
            const choices = ["rock", "paper", "scissors"];
            const randomIndex = Math.floor(Math.random() * choices.length);
            return choices[randomIndex];
        };

        s_Winner = "...";

        var idx = 0;
        s_MeImage = START_IMAGE_SEQUENCE[idx++];
        await sleep(1300);

        do {
            s_MeImage = START_IMAGE_SEQUENCE[idx++];
            await sleep(800);
        } while (idx < 4);
        const handGesture = choose();
        s_MeImage = HAND_GESTURES[handGesture];

        await sleep(500);
        s_Winner = await judge(handGesture);
    };

    const generateContentWithGemini = async (prompt, b64Image) => {
        const parse = (text) => {
            const objectStart = text.indexOf("{");
            const objectEnd = text.lastIndexOf("}");

            if (
                objectStart !== -1 &&
                objectEnd !== -1 &&
                objectStart < objectEnd
            ) {
                const jsonObject = text.substring(objectStart, objectEnd + 1);
                return JSON.parse(jsonObject);
            } else {
                return null;
            }
        };

        const text = await generateContent(prompt, b64Image);

        return parse(text);
    };

    const judge = async (handGesture) => {
        s_Modal.show();

        const r = s_Capture();
        s_YouImage = r.b64image;

        const answer = await generateContentWithGemini(
            `You have just played rock-paper-scissors with the person in the attached photo.
            
            Please answer what the person chose: rock, scissors, or paper.
            If the person chose rock, output {"hand": "rock"},
            if the person chose scissors, output {"hand": "scissors"},
            and if they chose paper, output {"hand": "paper"},
            if it is uncertain, output {"hand": "unknown"},
            in the JSON format.`,
            r.b64image,
        );

        const ME_RESULT = {
            rock: {
                rock: "draw",
                paper: "lost",
                scissors: "win",
                unkown: "unknown",
            },
            paper: {
                rock: "win",
                paper: "draw",
                scissors: "lost",
                unkown: "unknown",
            },
            scissors: {
                rock: "lost",
                paper: "win",
                scissors: "draw",
                unkown: "unknown",
            },
        };

        const result = ME_RESULT[handGesture][answer.hand];

        s_Modal.hide();

        return result === "lost" || result === "win" ? `Me ${result}!` : result;
    };
</script>

<h3>Rock Paper Scissors (Gemini)</h3>

<div class="d-flex w-100 mt-2">
    <div class="p-2">
        <!-- svelte-ignore a11y_media_has_caption -->
        <div class="w-100">
            <Camera subWindow="false," bind:capture={s_Capture}></Camera>
        </div>
        <div class="text-center mt-1">
            <button class="btn btn-primary" onclick={start}> Play </button>
        </div>
    </div>
    <div class="border rounded bg-light p-2">
        <div class="d-flex">
            <div class="p-2">
                <!-- svelte-ignore a11y_missing_attribute -->
                <img class="w-100 border rounded" src={s_MeImage} />
                <h4 class="w-100 text-center">Me</h4>
            </div>
            <div class="p-2">
                <!-- svelte-ignore a11y_missing_attribute -->
                <img class="w-100 border rounded" src={s_YouImage} />
                <h4 class="w-100 text-center">You</h4>
            </div>
        </div>
        <div class="w-100 text-center mt-2">
            <h3>{s_Winner}</h3>
        </div>
    </div>
</div>

<MessageModal title="Processing..." innerHTML={SPINNER} bind:modal={s_Modal}
></MessageModal>

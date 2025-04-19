<script>
    import { onMount } from "svelte";

    var { active = true, subWindow = true, capture = $bindable(), callback = null } = $props();

    var s_Video = $state();
    var s_Image = $state();

    var s_Shot = $state(false);

    capture = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = s_Video.videoWidth;
        canvas.height = s_Video.videoHeight;
        context.drawImage(s_Video, 0, 0, canvas.width, canvas.height);
        const b64Image = canvas.toDataURL("image/jpeg");

        const imageElm = document.createElement("img");
        imageElm.src = b64Image;
        imageElm.width = s_Video.videoWidth;
        imageElm.height = s_Video.videoHeight;

        s_Image.src = b64Image;
        s_Shot = true;

        if (callback) {
            callback(b64Image, imageElm);
        }
        return { b64image: b64Image, imageElm: imageElm };
    };

    const setup = async () => {
        if (active) {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            });
            s_Video.srcObject = stream;
        } else {
            const stream = s_Video.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
            }
            s_Video.srcObject = null;
        }
    }

    $effect(async () => {
        setup();
    });

    onMount(() => {
        setup();
    });
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video class="w-100 mt-2 border rounded" bind:this={s_Video} autoplay></video>
<div class="text-center mt-1">
    <button
        class="btn btn-primary {callback === null ? 'd-none' : 'd-inline'}"
        onclick={capture}>Capture</button
    >
</div>

<!-- svelte-ignore a11y_img_redundant_alt -->
<img
    class="w-100 mt-2 border rounded {(subWindow & s_Shot) ? 'd-inline' : 'd-none'}"
    bind:this={s_Image}
    alt="Captured Image"
/>

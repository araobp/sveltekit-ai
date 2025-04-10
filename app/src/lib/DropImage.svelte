<script>
    import { onMount } from "svelte";
    import "bootstrap/dist/css/bootstrap.min.css";

    // Drag and Drop an image
    // Reference: https://transloadit.com/devtips/implementing-file-uploads-with-bootstrap-5/

    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const DEFAULT_IMAGE = "/drag_and_drop.png";

    var {
        maxSize = MAX_SIZE,
        defaultImage = DEFAULT_IMAGE,
        callback,
    } = $props();

    var DropZone;
    var FileInput;
    var ErrorMessage;
    var Img;
    var imageElm;

    const id = crypto.randomUUID();

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    onMount(() => {
        imageElm = document.getElementById(id);

        Img.ondragover = (e) => {
            e.preventDefault();
            Img.classList.add("bg-light");
            Img.classList.add("border-primary");
        };

        Img.ondragleave = (e) => {
            Img.classList.remove("bg-light");
            Img.classList.remove("border-primary");
        };

        Img.ondrop = async (e) => {
            e.preventDefault();
            Img.classList.remove("bg-light");
            Img.classList.remove("border-primary");
            ErrorMessage.classList.add("d-none");

            try {
                const file = e.dataTransfer.files[0];
                if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                    throw new Error(
                        "Invalid file type. Please upload JPEG, PNG or WEBP.",
                    );
                }
                if (file.size > maxSize) {
                    throw new Error("File too large. Maximum size is 5MB.");
                }
                FileInput.files = e.dataTransfer.files;
                const b64Image = await toBase64(FileInput.files[0]);
                Img.src = b64Image;
                callback(b64Image, imageElm);
            } catch (error) {
                ErrorMessage.textContent = error.message;
                ErrorMessage.classList.remove("d-none");
            }
        };
    });
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<img id={id} bind:this={Img} src={defaultImage} class="border border-2 w-100" />
<div bind:this={ErrorMessage} class="alert alert-danger d-none mt-2"></div>
<input
    type="file"
    class="d-none"
    accept="image/jpeg,image/png"
    bind:this={FileInput}
/>

<slot />

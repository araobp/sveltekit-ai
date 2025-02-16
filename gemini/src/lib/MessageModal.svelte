<svelte:options customElement="message-modal" />

<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import "bootstrap/dist/css/bootstrap.min.css";

    var { title, innerHTML, modal = $bindable() } = $props();
    var bootstrap;

    onMount(async () => {
        bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
        modal = new bootstrap.Modal(
            document.getElementById("messageModal"),
            {},
        );
    });
</script>

<div
    class="modal fade"
    id="messageModal"
    tabindex="-1"
    aria-labelledby="messageModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="messageModalLabel">{title}</h1>
            </div>
            <div class="modal-body">
                {@html innerHTML}
            </div>
        </div>
    </div>
</div>

<slot />

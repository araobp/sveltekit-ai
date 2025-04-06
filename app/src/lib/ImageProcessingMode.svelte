<svelte:options customElement="imageprocessing-mode" />

<script>
    import { GEMINI, TF } from "$lib/settings";
    import { onMount } from "svelte";

    var { mode = $bindable() } = $props();
</script>

<div class="container mb-3">
    <div class="d-flex align-items-center mt-3">
        <div class="me-1">Mode:</div>
        <select class="form-select" style="width: 10rem;" bind:value={mode}>
            <option value={GEMINI} selected>Gemini</option>
            <option value={TF}>TensorFlow</option>
        </select>
    </div>
</div>

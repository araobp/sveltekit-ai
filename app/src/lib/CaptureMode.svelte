<script>
    import { IMAGE, CAMERA } from "./settings";
    var { mode = $bindable() } = $props();
</script>

<div class="container mb-3">
    <div class="d-flex align-items-center mt-3">
        <div class="me-1">Capture Mode:</div>
        <select class="form-select" style="width: 10rem;" bind:value={mode}>
            <option value={IMAGE} selected>Picture</option>
            <option value={CAMERA}>Video</option>
        </select>
    </div>
</div>

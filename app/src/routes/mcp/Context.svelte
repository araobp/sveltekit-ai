<script>
    import { onMount } from "svelte";

    var { type } = $props();

    var s_Result = $state("...");

    onMount(async () => {
        try {
            const response = await fetch(`/api/mcp?type=${type}`, {
                method: "GET",
            });
            if (!response.ok) {
                console.error(
                    `Failed to fetch MCP ${type}`,
                    response.statusText,
                );
                throw new Error(`Failed to fetch MCP ${type}`);
            }
            const data = await response.json();
            s_Result = JSON.stringify(data, null, 2);
        } catch (error) {
            s_Result = `Error: ${error.message}`;
        }
    });
</script>

<div>
    <textarea
        class="w-100 mt-2 rounded border p-2"
        rows="20"
        bind:value={s_Result}
    ></textarea>
</div>

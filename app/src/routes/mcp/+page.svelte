<script>
    import Chat from "./Chat.svelte";
    import Context from "./Context.svelte";
</script>

<div>
    <h3>MCP</h3>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button
                class="nav-link active"
                id="chat-tab"
                data-bs-toggle="tab"
                data-bs-target="#chat-tab-pane"
                type="button"
                role="tab"
                aria-controls="chat-tab-pane"
                aria-selected="true">Chat</button
            >
        </li>
        <li class="nav-item" role="presentation">
            <button
                class="nav-link"
                id="resources-tab"
                data-bs-toggle="tab"
                data-bs-target="#resources-tab-pane"
                type="button"
                role="tab"
                aria-controls="resources-tab-pane"
                aria-selected="true">Resources</button
            >
        </li>
        <li class="nav-item" role="presentation">
            <button
                class="nav-link"
                id="resource-templates-tab"
                data-bs-toggle="tab"
                data-bs-target="#resource-templates-tab-pane"
                type="button"
                role="tab"
                aria-controls="resource-templates-tab-pane"
                aria-selected="false">Resource Templates</button
            >
        </li>
        <li class="nav-item" role="presentation">
            <button
                class="nav-link"
                id="tools-tab"
                data-bs-toggle="tab"
                data-bs-target="#tools-tab-pane"
                type="button"
                role="tab"
                aria-controls="tools-tab-pane"
                aria-selected="false">Tools</button
            >
        </li>
        <li class="nav-item" role="presentation">
            <button
                class="nav-link"
                id="prompts-tab"
                data-bs-toggle="tab"
                data-bs-target="#prompts-tab-pane"
                type="button"
                role="tab"
                aria-controls="prompts-tab-pane"
                aria-selected="false">Prompts</button
            >
        </li>
    </ul>
    <div class="tab-content d-flex flex-column flex-grow-1" id="myTabContent">
        <div
            class="tab-pane fade show active"
            id="chat-tab-pane"
            role="tabpanel"
            aria-labelledby="chat-tab"
            tabindex="0"
        >
        <Chat></Chat>
        </div>
        <div
            class="tab-pane fade"
            id="resources-tab-pane"
            role="tabpanel"
            aria-labelledby="resources-tab"
            tabindex="0"
        >
            <Context type="resources"></Context>
        </div>
        <div
            class="tab-pane fade"
            id="resource-templates-tab-pane"
            role="tabpanel"
            aria-labelledby="resource-templates-tab"
            tabindex="0"
        >
            <Context type="resourceTemplates"></Context>
        </div>
        <div
            class="tab-pane fade"
            id="tools-tab-pane"
            role="tabpanel"
            aria-labelledby="tools-tab"
            tabindex="0"
        >
            <Context type="tools"></Context>
        </div>
        <div
            class="tab-pane fade"
            id="prompts-tab-pane"
            role="tabpanel"
            aria-labelledby="prompts-tab"
            tabindex="0"
        >
            <Context type="prompts"></Context>
        </div>
    </div>
</div>

<script>
    import { generateContent } from "$lib/genAiClient";
    import { tick } from "svelte";

    var s_Text = $state("");
    var s_Messages = $state([]);
    var s_Loading = $state(false);
    var chatInput;
    var chatOutput;

    $effect(() => {
        chatOutput = document.getElementById("chat-output");
        if (!s_Loading && chatInput) {
            chatInput.focus();
        }
    });

    const send = async () => {
        if (!s_Text.trim()) return;

        const userMessage = { text: s_Text, sender: "user" };
        s_Messages = [...s_Messages, userMessage];
        const prompt = s_Text;
        s_Text = ""; // Clear input
        chatInput.focus();
        
        

        s_Loading = true;
        try {
            const aiResponse = await generateContent(prompt, null, true);
            const aiMessage = { text: aiResponse, sender: "ai" };
            s_Messages = [...s_Messages, aiMessage];
        } catch (error) {
            const errorMessage = { text: "Error: Could not get a response.", sender: "ai" };
            s_Messages = [...s_Messages, errorMessage];
            console.error("Error generating content:", error);
        } finally {
            s_Loading = false;
        }

        chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to bottom
    };
</script>

<div class="d-flex flex-column h-100">
    <div class="overflow-auto border rounded p-3 mt-3" style="height: 60vh;" id="chat-output">
        {#if s_Messages.length === 0}
            <div class="text-center text-secondary fst-italic">Start chatting...</div>
        {/if}
        {#each s_Messages as message}
            <div class="mb-2 p-2 rounded-3" class:bg-primary={message.sender === 'user'} class:text-white={message.sender === 'user'} class:ms-auto={message.sender === 'user'} class:bg-light={message.sender === 'ai'} class:text-dark={message.sender === 'ai'} class:me-auto={message.sender === 'ai'} style="max-width: 80%;">
                {message.text}
            </div>
        {/each}
        {#if s_Loading}
            <div class="text-center p-2 fst-italic text-secondary">Generating response...</div>
        {/if}
    </div>

    <div class="d-flex align-items-center mt-2">
        <input
            type="text"
            class="form-control w-100"
            placeholder="Enter text..."
            bind:value={s_Text}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    send();
                }
            }}
            disabled={s_Loading}
            bind:this={chatInput}
        />
        <button class="btn btn-primary ms-2" onclick={send} disabled={s_Loading}>
            Send
        </button>
    </div>
</div>
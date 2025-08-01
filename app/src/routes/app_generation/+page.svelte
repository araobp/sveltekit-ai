<script>
    import { generateContent } from "$lib/genAiClient";
    import { browser } from "@tensorflow/tfjs";

    var s_Text = $state();
    var s_Data = $state();
    var s_Result = $state("...");

    const generateApp = async (text) => {
        s_Result = "...";
        const prompt = `Generate a single page app to visualize the data following the instruction below.
        
        The app's structure is as follows:
        - All the necessary HTML, CSS, and JavaScript code to run the app
        - The app should be a single HTML file that can be opened in a browser
        - All the necessary JavaScript libraries should be included via CDN links from jsdelivr
        - A main section that visualizes the data provided
        - The main section should occupy the full width and height of the viewport
        - Chart, table or network graph to visualize the data
        - White background and dark grey font color for better readability
        - No toolbar or navigation menu required
        - No operational buttons or controls required
        - No header or footer required

        Confirm that the generated app is gramatically correct and does not contain any errors.

        ## Instruction
        ${s_Text}

        ## Data (or Interest Area)

        ${s_Data}
        `;

        const result = await generateContent(prompt);
        s_Result = result.replace("```html\n", "").replace("```", "");
    };

    const openApp = () => {
        if (browser) {
            const newWindow = window.open("", "_blank");
            newWindow.document.write(s_Result);
            newWindow.document.close();
            newWindow.focus();
        } else {
            console.error(
                "This function can only be executed in a browser environment.",
            );
        }
    };
</script>

<div>
    <h3>App Generation (Gemini)</h3>

    <div class="mt-3">Instruction</div>

    <div class="d-flex align-items-center">
        <textarea
            type="text"
            rows="2"
            class="form-control w-100"
            placeholder="Enter text..."
            bind:value={s_Text}
            onkeypress={(e) => {
                if (e.key === "Enter") {
                    generateApp();
                }
            }}
        ></textarea>
        <button
            class="btn btn-primary ms-2"
            style="width: 10rem"
            onclick={generateApp}
        >
            Generate App
        </button>
    </div>

    <div class="mt-1">Data (or Interest Area)</div>

    <textarea
        class="form-control w-100"
        rows="6"
        bind:value={s_Data}
        placeholder="Enter data to visualize..."
    ></textarea>

    <hr />

    <div>App</div>
    <div
        class="w-100 rounded border p-2 mb-2"
        style="font-size: 0.8rem;
            font-family: monospace;
            height: 25vh; overflow-y: auto;"
        rows="10"
    >
        {s_Result}
    </div>

    <button class="btn btn-primary" style="width: 10rem" onclick={openApp}>
        Open App
    </button>
</div>

<script>
    import { PUBLIC_GEMINI_API_KEY } from "$env/static/public";
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import showdown from 'showdown';

    const converter = new showdown.Converter();

    var answer = $state("");
    var prompt = $state("Am I smart?");

    const genAI = new GoogleGenerativeAI(PUBLIC_GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const test = async () => {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const html = converter.makeHtml(text);
        answer = html;
    };

    test();
</script>

<h1>Gemini 1.5 Flash</h1>

<table class="table">
    <thead>
        <tr>
            <th>Query</th>
            <th>Response</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{prompt}</td>
            <td>{@html answer}</td>
        </tr>
    </tbody>
</table>

<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
</style>

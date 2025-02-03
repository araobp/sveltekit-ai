<h1>Gemini</h1>

<p>
Query: {prompt}
</p>

<p>
Answer: {answer}
</p>

<script>
    import { PUBLIC_GEMINI_API_KEY } from "$env/static/public";
    import { GoogleGenerativeAI } from "@google/generative-ai";

    var answer = $state("");
    var prompt = $state("Am I smart?");

    const genAI = new GoogleGenerativeAI(PUBLIC_GEMINI_API_KEY);
    //console.log(PUBLIC_GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const test = async () => {
        const result = await model.generateContent(prompt);
        answer = result.response.text();
    };

    test();
</script>

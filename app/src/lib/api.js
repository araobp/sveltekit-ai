export const generateContent = async (prompt, b64Image = null) => {

    var _b64Image = null;
    if (b64Image) {
        const data = b64Image ? b64Image.split(",")[1].trim() : null;
        const mimeType = b64Image ? b64Image.split(";")[0].split(":")[1] : null;
        _b64Image = { data, mimeType };
    }

    const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, b64Image: _b64Image }),
    });

    return await response.text();
};
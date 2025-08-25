# SvelteKit AI Demos

This project demonstrates various AI functionalities integrated into a SvelteKit web application. It's a personal exploration of how to use Generative AI to create more personalized and intelligent user experiences.

## Key Features

This application showcases a variety of AI-powered features:

*   **Image and Object Detection:** Utilizes both server-side (Gemini) and client-side (TensorFlow.js) models to identify objects in static images and real-time webcam streams.
*   **Natural Language Processing:** Includes text translation and text-to-speech synthesis (using OpenAI's TTS).
*   **Generative AI:** Features an "App Generation" tool that creates new UI components based on user prompts.
*   **AI-Powered Gaming:** A classic "Rock Paper Scissors" game where the computer's moves are AI-driven.
*   **MCP Integration:** The SvelteKit backend communicates with a local MCP (Model-as-a-Process) server via STDIO, separating the AI logic from the web server.

## Demos

### Image Recognition
*   **Gemini vs. TensorFlow.js:** Compare cloud-based and in-browser image classification.
    *   <img src="docs/image_recognition_cat_gemini.jpg" width=600>
    *   <img src="docs/image_recognition_cat_tf.jpg" width=600>

### Object Detection
*   **Static Image:** Detect objects in a pre-loaded image.
    *   <img src="docs/object_detection_cars_gemini.jpg" width=600>
*   **Webcam:** Perform real-time object detection on a live video stream.
    *   <img src="docs/object_detection_cup_gemini.jpg" width=600>

### Other AI Demos
*   **Text to Speech:** Convert text to audio with various voices and emotions.
    *   <img src="docs/speech_with_emotion.jpg" width=600>
*   **Translation:** Translate text between languages.
    *   <img src="docs/translation_gemini.jpg" width=600>
*   **Rock Paper Scissors:** Play against an AI.
    *   <img src="docs/rock_paper_scissors.jpg" width=600>
*   **App Generation:** Generate a data visualization app from a prompt.
    *   <img src="docs/app_generation.jpg" width=600>

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

*   **Node.js:** [Download and install](https://nodejs.org/)
*   **API Keys:**
    *   `GEMINI_API_KEY`: Required for most features.
    *   `OPENAI_API_KEY`: Required for Text to Speech.

    Create a `.env` file in the `app/` directory and add your API keys:
    ```
    GEMINI_API_KEY="YOUR_GEMINI_KEY"
    OPENAI_API_KEY="YOUR_OPENAI_KEY"
    ```

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd sveltekit-ai
    ```
2.  **Install dependencies:**
    ```bash
    cd app
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Building for Production

1.  **Build the app:**
    ```bash
    cd app
    npm run build
    ```
2.  **Run the production server:**
    ```bash
    cd build
    node index.js
    ```

## MCP (Model-as-a-Process)

The MCP architecture separates the AI model from the main application. The SvelteKit backend communicates with a separate Node.js process (`McpServer.js`) using STDIO. This allows for independent development and deployment of the AI models.

```
                             [Google Gemini]
                                   |
                                  REST
                                   |
[McpServer.js]---STDIO---[SvelteKit backend]---REST---[SvelteKit frontend]
```

## References

*   [SvelteKit](https://kit.svelte.dev/)
*   [Gemini API](https://ai.google.dev/gemini-api/docs)
*   [TensorFlow.js](https://www.tensorflow.org/js)
*   [OpenAI API](https://platform.openai.com/docs)

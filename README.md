# SvelteKit and AI

This project is a web application built with SvelteKit that showcases a variety of Artificial Intelligence (AI) capabilities. It serves as a practical demonstration of integrating and utilizing different AI models and services, including Google Gemini, TensorFlow.js, and the OpenAI API. Explore diverse functionalities ranging from image analysis and voice synthesis to language translation and interactive gaming.

Learn SvelteKit by doing with AI: Gemini, TensorFlow and OpenAI.

SvelteKit has dramatically made my work easier! Good bye, VanillaJS.

## Features

### Vision

#### Image Recognition
- **Gemini 2.0 Flash**
  <img src="docs/image_recognition_cat_gemini.jpg" width=600>
- **TensorFlow.js mobilenet**
  <img src="docs/image_recognition_cat_tf.jpg" width=600>

#### Object Detection
- **Gemini 2.0 Flash**
  <img src="docs/object_detection_cars_gemini.jpg" width=600>
- **TensorFlow.js coco-ssd**
  <img src="docs/object_detection_cars_tf.jpg" width=600>

#### Object Detection (Webcam capture)
- **Gemini 2.0 Flash**
  <img src="docs/object_detection_cup_gemini.jpg" width=600>
- **TensorFlow.js coco-ssd**
  <img src="docs/object_detection_cup_tf.jpg" width=600>

### Language

#### Text to Speech
- **OpenAI gpt-4o-mini-tts**
  This UI allows you to select voice and emotion.
  <img src="docs/speech_with_emotion.jpg" width=600>

#### Translation
- **Gemini 2.0 Flash**
  <img src="docs/translation_gemini.jpg" width=600>

### Game

#### Rock Paper Scissors
<img src="docs/rock_paper_scissors.jpg" width=600>

## Technologies Used

This project leverages a combination of modern web technologies and cutting-edge AI models:

*   **Frontend Framework:** [SvelteKit](https://svelte.dev/docs/kit) - For building a reactive and performant user interface.
*   **AI Models & Services:**
    *   [Google Gemini](https://ai.google.dev/gemini-api/docs) (2.0 Flash) - Used for advanced image recognition, object detection, and translation tasks.
    *   [TensorFlow.js](https://www.tensorflow.org/js) (mobilenet, coco-ssd) - For client-side image recognition and object detection.
    *   [OpenAI API](https://platform.openai.com/docs/guides/text-to-speech) (gpt-4o-mini-tts) - For high-quality text-to-speech generation with voice and emotion selection.
*   **Styling:** [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - For responsive layout and UI components.
*   **Programming Language:** JavaScript - The primary language for both frontend and backend logic.

## Running the App

The core application is located within the `app/` directory.

### Development Mode

To run the application in a development environment with hot-reloading:

1.  Navigate to the app directory:
    ```bash
    cd app
    ```
2.  Install dependencies (if you haven't already):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    This will typically make the app available at `http://localhost:5173`.

### Production Mode

To build the application for production and run it locally:

1.  Navigate to the app directory:
    ```bash
    cd app
    ```
2.  Install dependencies (if you haven't already):
    ```bash
    npm install
    ```
3.  Build the application:
    ```bash
    npm run build
    ```
4.  Run the production server (this assumes you are using `adapter-node`):
    ```bash
    node build/index.js
    ```
    The application will then be served, typically on `http://localhost:3000`.

## Assets

This project includes supplementary assets to support its functionalities and development:

*   **Sample Images (`images/`):** This directory contains a collection of images used for demonstrating the capabilities of the image recognition and object detection features. These images are CC0 licensed and sourced from [ISO Republic](https://isorepublic.com/).
*   **Blender Files (`blender/`):** This directory includes a Blender file (`drag_and_drop.blend`) and an associated image (`drag_and_drop.png`). These assets may have been used in the design or visualization of UI components, such as drag-and-drop interfaces within the application. The static version of the PNG is also available in `app/static/drag_and_drop.png`.

## Contributing

Contributions to this project are welcome! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch for your changes.
3.  Make your modifications.
4.  Submit a pull request with a clear description of your changes.

We appreciate your input in making this project better.

## References

### SvelteKit
- [Tutorial](https://svelte.dev/tutorial/kit/introducing-sveltekit)
- [Creating a project](https://svelte.dev/docs/kit/creating-a-project)
- [Node Servers](https://svelte.dev/docs/kit/adapter-node)
- [Building an app](https://svelte.dev/docs/kit/building-your-app)

### Bootstrap
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

### Gemini
- [Text Generation](https://ai.google.dev/gemini-api/docs/text-generation)

### TensorFlow
- [TensorFlow.js](https://www.tensorflow.org/js)

### OpenAI
- [Text to Speech](https://platform.openai.com/docs/guides/text-to-speech?lang=javascript)

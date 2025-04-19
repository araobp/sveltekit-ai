# SvelteKit and AI

Learn SvelteKit by doing with AI: Gemini, TensorFlow and OpenAI.

SvelteKit has dramatically made my work easier! Good bye, VanillaJS.

## App

### Image Recognition

#### Gemini 2.0 Flash

<img src="docs/image_recognition_cat_gemini.jpg" width=600>

#### TensorFlow.js mobilenet

<img src="docs/image_recognition_cat_tf.jpg" width=600>

### Object Detection

#### Gemini 2.0 Flash

<img src="docs/object_detection_cars_gemini.jpg" width=600>

#### TensorFlow.js coco-ssd

<img src="docs/object_detection_cars_tf.jpg" width=600>

### Object Detection (Webcam capture)

#### Gemini 2.0 Flash

<img src="docs/object_detection_cup_gemini.jpg" width=600>

#### TensorFlow.js coco-ssd

<img src="docs/object_detection_cup_tf.jpg" width=600>

### Text to Speech

#### OpenAI gpt-4o-mini-tts

This UI allows you to select voice and emotion.

<img src="docs/speech_with_emotion.jpg" width=600>

### Translation

#### Gemini 2.0 Flash

<img src="docs/translation_gemini.jpg" width=600>

### Game

#### Rock Paper Scissors

<img src="docs/rock_paper_scissors.jpg" width=600>


## Running the app

To run the app in the development environment,
```
$ cd app
$ npm run dev
```

To build and run the app,
```
$ cd app
$ npm run build
$ cd build
$ node index.js
```

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

# SvelteKit and AI

Learn SvelteKit by doing with AI: Gemini, TensorFlow and OpenAI.

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


## Code

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

### TensorFlow
- [TensorFlow.js](https://www.tensorflow.org/js)

### OpenAI
- [TTS](https://platform.openai.com/docs/guides/text-to-speech?lang=javascript)

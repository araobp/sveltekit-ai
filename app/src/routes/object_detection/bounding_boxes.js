import { GEMINI, TF } from "$lib/settings";

export const drawBoundingBoxes = (imageElement, boundingBoxes, mode) => {
  /**
   * Draws a bounding box on an image.
   *
   * @param {HTMLImageElement} imageElement - The image element to draw on.
   * @param {object} boundingBox - An object with properties: x, y, width, height.
   * x and y are the top-left coordinates of the box.
   * width and height are the dimensions of the box.
   */

  /*
    In the COCO dataset, bounding boxes are represented by four values:
    [x_min, y_min, width, height],
    where x_min and y_min are the coordinates of the top-left corner, and width and height are in pixels. 
  */

  if (!imageElement || !boundingBoxes) {
    console.error("Invalid input: imageElement and boundingBox are required.");
    return;
  }

  const canvas = document.createElement("canvas");

  // Set canvas dimensions to match the image
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  // Draw the image onto the canvas
  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);

  // Draw the bounding box
  context.strokeStyle = "red"; // Box color
  context.lineWidth = 2; // Box line width

  var scaleX;
  var scaleY;

  if (mode === GEMINI) {
    scaleX = imageElement.width / 1000;
    scaleY = imageElement.height / 1000;
  } else if (mode === TF) {
    scaleX = 1;
    scaleY = 1;
  }

  boundingBoxes.forEach(r => {
    const boundingBox = r.box_2d;

    const xmin = boundingBox[1] * scaleX;
    const ymin = boundingBox[0] * scaleY;
    const xmax = boundingBox[3] * scaleX;
    const ymax = boundingBox[2] * scaleY;
    context.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);

    // Set font properties
    const fontScale = imageElement.width / 1000;
    const fontSize = (fontScale * 18).toFixed(0);
    context.font = `${fontSize}px Arial`; // Font size and family
    context.fillStyle = "red"; // Text color
    context.textAlign = "left"; // Text alignment

    // Draw letters
    context.fillText(r.label, xmin + fontScale * 9, ymax - fontScale * 18 / 2);
  });

  // Replace the image with the canvas
  imageElement.parentNode.replaceChild(canvas, imageElement);
  canvas.style.width = "100%";
}

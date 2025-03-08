export const drawBoundingBoxes = (imageElement, boundingBoxes) => {
  /**
   * Draws a bounding box on an image.
   *
   * @param {HTMLImageElement} imageElement - The image element to draw on.
   * @param {object} boundingBox - An object with properties: x, y, width, height.
   * x and y are the top-left coordinates of the box.
   * width and height are the dimensions of the box.
   */

  if (!imageElement || !boundingBoxes) {
    console.error("Invalid input: imageElement and boundingBox are required.");
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas dimensions to match the image
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  // Draw the image onto the canvas
  context.drawImage(imageElement, 0, 0);

  // Draw the bounding box
  context.strokeStyle = "red"; // Box color
  context.lineWidth = 2; // Box line width

  const scaleX = imageElement.width / 1000;
  const scaleY = imageElement.height / 1000;

  boundingBoxes.forEach(r => {
    const boundingBox = r.box_2d;

    const xmin = boundingBox[1] * scaleX;
    const ymin = boundingBox[0] * scaleY;
    const xmax = boundingBox[3] * scaleX;
    const ymax = boundingBox[2] * scaleY;
    context.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);

    // Set font properties
    context.font = "24px Arial"; // Font size and family
    context.fillStyle = "red"; // Text color
    context.textAlign = "left"; // Text alignment

    // Draw letters
    context.fillText(r.label, xmin + 9, ymax - 24/2);
  });

  // Replace the image with the canvas
  imageElement.parentNode.replaceChild(canvas, imageElement);
  canvas.style.width = "100%";
}

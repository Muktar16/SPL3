import React, { useEffect, useRef } from 'react';
import * as handTrack from 'handtrackjs';

const ImageHandDetection = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const loadModelAndDetect = async () => {
      try {
        const model = await handTrack.load();
        const imgElement = imgRef.current;

        if (imgElement.complete) {
          const predictions = await model.detect(imgElement);
          handlePredictions(predictions);
        } else {
          imgElement.onload = async () => {
            const predictions = await model.detect(imgElement);
            handlePredictions(predictions);
          };
        }
      } catch (error) {
        console.error('Error loading model or detecting hands:', error);
      }
    };

    loadModelAndDetect();
  }, []);

  const handlePredictions = (predictions) => {
    // Draw rectangles around detected hands
    const imgElement = imgRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size to match image size
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // Draw the image on the canvas
    context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    // Draw rectangles around detected hands
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      context.beginPath();
      context.rect(x, y, width, height);
      context.lineWidth = 2;
      context.strokeStyle = 'red';
      context.fillStyle = 'transparent';
      context.stroke();
    });

    // Replace the original image with the canvas
    imgElement.parentNode.replaceChild(canvas, imgElement);
  };

  return (
    <div>
      <img ref={imgRef} src="/words/ami.jpg" alt="Hand detection example" />
    </div>
  );
};

export default ImageHandDetection;

import React, { useEffect, useRef, useState } from 'react';
import { Upload, Button, message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import * as handTrack from 'handtrackjs';

const Camera = () => {
  const [handDetected, setHandDetected] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    initCamera();
  }, []);

  const initCamera = async () => {
    try {
      if (isMobile) {
        // Code to access mobile camera using Ant Design Upload
        // Implement your own logic for mobile camera access
        console.log('Accessing mobile camera');
      } else {
        // Code to access webcam and detect hand using Handtrack.js
        const video = videoRef.current;
        const canvas = canvasRef.current;
  
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
  
          const model = await handTrack.load();
          handTrack.startVideo(video).then(status => {
            if (status) {
              detectHand(model, video, canvas);
            } else {
              message.error('Failed to start video');
            }
          });
  
          // Set canvas size to match video dimensions
          video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          });
        } else {
          message.error('Webcam access not supported in this browser');
        }
      }
    } catch (error) {
      console.error('Error initializing camera:', error);
    }
  };  
  

  const detectHand = async (model, video, canvas) => {
    try {
      const predictions = await model.detect(video);
  
      if (predictions.length > 0) {
        setHandDetected(true);
  
        // Draw rectangle around the detected hand
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        predictions.forEach(prediction => {
          const [x, y, width, height] = prediction.bbox;
          const aspectRatio = width / height;
  
          const aspectRatioThreshold = 3;
          if (aspectRatio < aspectRatioThreshold) {
            // Draw rectangle around the detected hand with a transparent fill
            context.beginPath();
            context.rect(x, y, width, height);
            context.lineWidth = 2;
            context.strokeStyle = 'red';
            context.fillStyle = 'transparent';
            context.stroke();
    
            // Optional: You can also add text or other visual elements
            context.font = '16px Arial';
            context.fillStyle = 'red';
            context.fillText('Hand', x + 5, y + 20);
          }
          // Draw rectangle around the detected hand with a transparent fill
          context.beginPath();
          context.rect(x, y, width, height);
          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.fillStyle = 'transparent';
          context.stroke();
  
          // Optional: You can also add text or other visual elements
          context.font = '16px Arial';
          context.fillStyle = 'red';
          context.fillText('Hand', x + 5, y + 20);
        });
      } else {
        setHandDetected(false);
  
        // Clear the canvas if no hands are detected
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
  
      requestAnimationFrame(() => detectHand(model, video, canvas));
    } catch (error) {
      console.error('Error detecting hand:', error);
    }
  };
  

  return (
    <div>
      {isMobile ? (
        // Ant Design Upload for mobile camera access
        <Upload
          showUploadList={false}
        //   customRequest={yourMobileCameraUploadFunction}
          beforeUpload={() => false}
        >
          <Button icon={<CameraOutlined />} disabled={handDetected}>
            Take Photo
          </Button>
        </Upload>
      ) : (
        // Video element for webcam and hand detection on desktop
        <div style={{ maxWidth: '100%',width: '100%', height: '100%' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ maxWidth: '100%',width: '500px', height: '600px' }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0,width: '500px', height: '600px' }}
          />
        </div>
      )}
    </div>
  );
};

export default Camera;


// import React, { useRef, useEffect } from 'react';
// import * as handTrack from 'handtrackjs';

// function Camera() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const predictionsRef = useRef([]);

//   useEffect(() => {
//     const startHandTracking = async () => {
//         const model = await handTrack.load();
      
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//           videoRef.current.srcObject = stream;
      
//           // Wait for the video to be loaded and metadata to be ready
//           await new Promise((resolve) => {
//             videoRef.current.onloadedmetadata = resolve;
//           });
      
//           videoRef.current.play().then(() => {
//             const trackHands = async () => {
//                 try {
//                   predictionsRef.current = await model.detect(videoRef.current);
              
//                   const ctx = canvasRef.current.getContext('2d');
//                   ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              
//                   if (predictionsRef.current && predictionsRef.current.length > 0) {
//                     predictionsRef.current.forEach((prediction) => {
//                       const { boundingBox } = prediction;
              
//                       if (boundingBox) {
//                         ctx.strokeStyle = '#FF0000';
//                         ctx.strokeRect(
//                           boundingBox.x,
//                           boundingBox.y,
//                           boundingBox.width,
//                           boundingBox.height
//                         );
//                       }
//                     });
//                   }
              
//                   requestAnimationFrame(trackHands);
//                 } catch (error) {
//                   console.error('Error tracking hands:', error);
//                 }
//               };
              
      
//             trackHands();
//           });
//         } catch (error) {
//           console.error('Error accessing camera:', error);
//         }
//       };
//     startHandTracking();      
//   }, []);

//   useEffect(() => {
//     // Set canvas size based on video dimensions
//     if (videoRef.current) {
//       canvasRef.current.width = videoRef.current.videoWidth;
//       canvasRef.current.height = videoRef.current.videoHeight;
//     }
//   }, [videoRef]);

//   return (
//     <div>
//       <video ref={videoRef} width={640} height={480} autoPlay muted />
//       <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
//     </div>
//   );
// }

// export default Camera;


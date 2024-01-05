import React, { useEffect, useRef, useState } from 'react';
import { Upload, Button, message } from 'antd';
import { CameraOutlined, ReloadOutlined, CheckOutlined } from '@ant-design/icons';

const Camera = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    initCamera();

    return () => {
      // Cleanup code if needed
      clearInterval(intervalRef.current);
    };
  }, []);

  const initCamera = async () => {
    try {
      if (isMobile) {
        // Code to access mobile camera using Ant Design Upload
        // Implement your own logic for mobile camera access
        console.log('Accessing mobile camera');
      } else {
        // Code to access webcam without hand detection
        const video = videoRef.current;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
        } else {
          message.error('Webcam access not supported in this browser');
        }
      }
    } catch (error) {
      console.error('Error initializing camera:', error);
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : null));
    }, 1000);
  };

  const takePhoto = () => {
    clearInterval(intervalRef.current);

    // Add logic to capture the photo here
    // You can use the videoRef to grab a frame or use other methods
    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    setPhoto(canvas.toDataURL());
  };

  const resetPhoto = () => {
    setPhoto(null);
    setCountdown(null);
    startCountdown();
  };

  const savePhoto = () => {
    // Add logic to save the photo (e.g., send to server or download)
    message.success('Photo saved!');
    resetPhoto();
  };

  return (
    <div>
      {isMobile ? (
        // Ant Design Upload for mobile camera access
        <Upload showUploadList={false} beforeUpload={() => false}>
          <Button icon={<CameraOutlined />} onClick={takePhoto} disabled={photo !== null}>
            Take Photo
          </Button>
        </Upload>
      ) : (
        // Video element for webcam without hand detection on desktop
        <div style={{ maxWidth: '100%', width: '100%', height: '100%', position: 'relative' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ maxWidth: '100%', width: '500px', height: '600px' }}
            onClick={countdown === null ? takePhoto : startCountdown}
          />
          {countdown !== null && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <h1>{countdown}</h1>
            </div>
          )}
          {photo && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)' }}>
              <img src={photo} alt="Captured" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex' }}>
                <Button icon={<ReloadOutlined />} onClick={resetPhoto} style={{ marginRight: '10px' }}>
                  Retry
                </Button>
                <Button icon={<CheckOutlined />} onClick={savePhoto}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Camera;

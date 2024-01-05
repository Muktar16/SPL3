import React, { useState, useRef, useEffect } from "react";
import { Tabs, Form, Upload, Button, message, Modal } from "antd";
import Fileuploader from "../../components/Camera/Fileuploader";
import Fileuploader2 from "../../components/Camera/Fileuploader2";


const { TabPane } = Tabs;

const Practice = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const videoRef = useRef(null);
  const [openModal,setOpenModal] = useState(false);

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      const file = info.file.originFileObj;
      setImageFile(file);
      displayImagePreview(file);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleTakePhoto = async () => {
    if (isMobileDevice()) {
      // Use file input with 'capture' attribute for mobile devices
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "camera";

      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImageFile(file);
          displayImagePreview(file);
        }
      };

      input.click();
    } else {
      // Use getUserMedia API for desktop devices
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        const video = document.createElement("video");
        video.autoplay = true;
        videoRef.current = video;

        document.body.appendChild(video);

        video.srcObject = stream;

        await new Promise((resolve) => {
          video.onloadedmetadata = () => {
            resolve();
          };
        });

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          const file = new File([blob], "photo.png", { type: "image/png" });
          setImageFile(file);
          displayImagePreview(file);
        }, "image/png");
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const displayImagePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    console.log("Selected Image File:", imageFile);
    // Perform API call with formData, including the imageFile
  };

  useEffect(() => {
    // Cleanup video element on component unmount
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        document.body.removeChild(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "800px",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          border: "1px dotted #8c8c8c",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Characters/Digits" key="1">
            <div
              style={{
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
                {/* <Button onClick={()=>setOpenModal(true)}>Live Detection</Button>
                <Modal open={openModal} onCancel={()=>setOpenModal(false)}>
                <img src="http://127.0.0.1:5000/api/video_feed"></img>
                </Modal> */}
            
                <Fileuploader/>
              {/* <Form onFinish={handleSubmit}>
                <Form.Item name='file'>
                  <Upload
                    beforeUpload={() => false}
                    onChange={handleFileChange}
                    previewFile={true}
                  >
                    <Button>Upload Sign Photo</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button style={{background:'blue'}} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={handleTakePhoto}>Take a Photo</Button>
                </Form.Item>
                {imagePreview && (
                  <Form.Item>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                  </Form.Item>
                )}
                
              </Form> */}
            </div>
          </TabPane>
          <TabPane tab="Words" key="2">
            <div
              style={{
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            ><Fileuploader2></Fileuploader2></div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Practice;

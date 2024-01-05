import React, { useState, useRef, useEffect } from "react";
import { Tabs, Select, message } from "antd";
import { characters, digits, words } from "../../utils/Characters";
import axios from "axios";

const { TabPane } = Tabs;
const { Option } = Select;

const Practice = () => {
  const [charOptions, setCharOptions] = useState([...characters, ...digits]);
  const [wordOptions, setWordOptions] = useState(words);
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    setupCamera();

    return () => {
      // Cleanup camera stream when component unmounts
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCharactersOptionChange = (value) => {
    console.log("Selected Characters Option:", value);
    // Add your logic for handling the selected option
  };

  const handleWordsOptionChange = (value) => {
    console.log("Selected Words Option:", value);
    // Add your logic for handling the selected option
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadCharacters = async () => {
    if (!selectedFile) {
      message.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const url = "http://127.0.0.1:5000/upload";
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        message.success("File uploaded successfully");
        console.log("Prediction Result:", response.data);
      } else {
        message.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while processing the image");
    }
  };

  const handleUploadWords = async () => {
    if (!selectedFile) {
      message.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const url = "http://127.0.0.1:5000/word";
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        message.success("File uploaded successfully");
        console.log("Prediction Result:", response.data);
      } else {
        message.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while processing the image");
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;

    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const file = new File([blob], "captured-image.png", { type: "image/png" });
        setSelectedFile(file);
      }, "image/png");
    }
  };

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
            <label>Select an option:</label>
            <Select
              style={{ minWidth: "100px" }}
              defaultValue="0"
              dropdownStyle={{ minWidth: "100px" }}
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              onChange={handleCharactersOptionChange}
            >
              {charOptions?.map((option, index) => (
                <Option key={index} value={option?.label}>
                  {option.character}
                </Option>
              ))}
            </Select>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadCharacters}>Upload Image</button>
          </TabPane>
          <TabPane tab="Words" key="2">
            <h2>Words</h2>
            <label>Select an option:</label>
            <Select
              style={{ minWidth: "100px" }}
              defaultValue="aaj"
              dropdownStyle={{ minWidth: "100px" }}
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              onChange={handleWordsOptionChange}
            >
              {wordOptions?.map((word, index) => (
                <Option key={index} value={word.label}>
                  {word?.character}
                </Option>
              ))}
            </Select>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadWords}>Upload Image</button>
          </TabPane>
        </Tabs>
        <div style={{ marginTop: "20px" }}>
          <label>Take a Picture:</label>
          <img src={"http://127.0.0.1:8000/word-detector"} ></img>
          {/* <video ref={videoRef} width="400" height="300" autoPlay playsInline></video> */}
          <button onClick={handleCapture}>Capture</button>
        </div>
      </div>
    </div>
  );
};

export default Practice;

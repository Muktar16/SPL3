import React, { useState } from "react";
import { Upload, Button, message, Image, Row, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { characters, digits } from "../../utils/Characters";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [label1,setLabel1] = useState(null);

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://127.0.0.1:5000/char", formData);
        console.log(response);
        const foundObject = [...characters,...digits].find(obj => obj.label === response?.data?.prediction);
        setLabel1(foundObject.character)
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("An error occurred while uploading the file");
      }
    } else {
      message.warning("Please select a file before uploading");
    }
  };

  const handleClear = () => {
    setFile(null);
    setLabel1(null);
  }

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <Upload
        maxCount={1}
        customRequest={({ file, onSuccess, onError }) => {
          // You can use customRequest to prevent automatic file upload
          // and handle it manually, allowing you to use your own logic
          onSuccess();
        }}
        onChange={handleFileChange}
        showUploadList={false} // Hides the default file list
      >
        <Button style={{marginLeft:'20px'}} icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      {file && <Image style={{margin:'5px'}} src={URL.createObjectURL(file)} alt="Preview" width={200} />}
        <p style={{color:'green',margin:'5px', fontSize:'35px',textAlign:'center'}}>{label1}</p>
      <Space>
        <Button type="primary" onClick={handleSubmit} style={{background:'blue',margin:'5px' }}>
        Show Character/Digit
      </Button>
     {label1 && ( <Button onClick={handleClear}>
        clear
      </Button>)}
      </Space>
    </div>
  );
};

export default FileUploader;

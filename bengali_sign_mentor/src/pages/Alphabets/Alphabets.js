import { Button, Carousel, Col, Image, Row, Switch, Tabs } from "antd";
import React, { useState } from "react";
import { characters } from "../../utils/Characters";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

function Alphabets() {
  const [current,setCurrent] = useState(0);
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Slide Show",
      children: (
        <div style={{minWidth:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Row>
            <Col style={{fontSize:'24px', color:'green'}} span={24}>{characters[current]?.character}</Col>
          </Row>
          <Row>
            <Col span={24} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <ArrowLeftOutlined onClick={()=>{if(current > 0)setCurrent(current-1)}} style={{zIndex:5,fontSize:'30px',color:'blue',marginRight:'-10px'}}/>
              <Image preview={false} style={{maxWidth:'100%', height:'400px'}} src={`/alphabets/characters/${characters[current]?.image}`}/>
              <ArrowRightOutlined onClick={()=>{if(current < characters.length-1)setCurrent(current+1)}} style={{zIndex:5,fontSize:'30px',color:'blue',marginLeft:'-10px'}}/>
            </Col>
          </Row>
         
        </div>
      ),
    },
    {
      key: "2",
      label: "Full Set",
      children: <img src="/alphabets/bdsl-fullset.png" />,
    },
  ];
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
        <Tabs
          style={{ width: "100%" }}
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        ></Tabs>
      </div>
    </div>
  );
}

export default Alphabets;

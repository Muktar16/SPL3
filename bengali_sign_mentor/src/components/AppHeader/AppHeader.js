import { Button, Drawer, Input, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import StyledText from "../StyledText/StyledText";
import "./style.css";
import {
  FileTextOutlined,
  FontSizeOutlined,
  FormOutlined,
  MenuOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleNavigation = (e) => {
    setVisible(false);
    navigate(`${e.key}`);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

  const items = [
    { label: "বর্ণমালা", key: "/alphabets", icon: (<img style={{height:'20px', paddingTop:'5px'}} src="/characters-icon.png"></img>) },
    { label: "অংক", key: "/digits", icon: <NumberOutlined /> },
    { label: "শব্দ", key: "/words", icon: <FileTextOutlined /> },
    { label: "প্র্যাকটিস", key: "/practice", icon: <FormOutlined /> },
  ];

  return (
    <div className="header">
      {/* logo */}
      <div className="logo-container">
        <Space>
          <img className="logo" src="/logo.jpg" alt="Logo" />
          <StyledText text={"BengaliSignMentor"} />
        </Space>
      </div>
      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon">
        <Button icon={<MenuOutlined/>} onClick={showDrawer}>
        </Button>
      </div>
      {/* search box */}
      {/* <div className="search-box">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        </div> */}
      {/* Desktop Menu */}
      <div className="desktop-menu">
        <Menu
          style={{width:'100%',backgroundColor: 'transparent', border:'0px solid black'}}
          items={items}
          theme="light"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={handleNavigation}
        />
      </div>
      
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Menu onClick={handleNavigation} selectedKeys={[current]} items={items} theme="light" mode="vertical" />
      </Drawer>
    </div>
  );
}

export default AppHeader;

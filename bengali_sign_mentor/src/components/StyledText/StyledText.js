import React from "react";

const StyledText = ({ text }) => {
  const textStyle = {
    fontSize: "1.2rem",
    background: `-webkit-linear-gradient(#ff6347, #4169e1)`, // Use your desired colors here
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block", // Ensures that the background gradient is applied to each character
  };

  return <div style={textStyle}>{text}</div>;
};

export default StyledText;

import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import { words } from "../../utils/Characters";
import './style.css';

const columns = [
  {
    title: "শব্দ",
    dataIndex: "word",
    key: "word",
    align: "center",
    render: (word) => (
        <h2 style={{fontSize:'25px'}}>{word}</h2>
    )
  },
  {
    title: "সংকেত",
    dataIndex: "signImage",
    key: "signImage",
    align:'center',
    render: (signImage) => (
      <Image
        style={{width:'180px', height:'200px'}}
        src={`/words/${signImage}`}
        alt="Sign"
      />
    ),
  },
];

function Words() {
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    setWordData(
      words?.map((word, index) => ({
        key: index,
        word: word.character,
        signImage: word.image,
      }))
    );
  }, []);

  return (
    <div style={{ padding: "20px", width: "100%", alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Table style={{ width: "100%", maxWidth: "600px" }} dataSource={wordData} columns={columns} />
    </div>
  );
}

export default Words;

import React from "react";
import { LeftOutlined } from "@ant-design/icons";

const link = {
  color: "#333333",
  textDecoration: "none",
};

const goBack = (e) => {
  e.preventDefault();
  window.history.back();
};

const GoBack = ({ title, customStyle = {} }) => {
  return (
    <div>
      <a
        href="###"
        onClick={(e) => goBack(e)}
        style={{ ...link, ...customStyle }}
      >
        <LeftOutlined />
        <span style={{ paddingLeft: "5px" }}>{title}</span>
      </a>
    </div>
  );
};
export default GoBack;

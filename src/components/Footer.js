import React from "react";
import { Link } from "gatsby";
import { GithubOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <GithubOutlined /> Built by Applysquare and contributors with ❤️
      <Link to="/about">About us</Link>
    </div>
  );
};

export default Footer;

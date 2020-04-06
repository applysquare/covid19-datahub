import React from "react";
import { Link } from "gatsby";
import { GithubOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <div>
      <div>

      </div>
      <div>
        <GithubOutlined /> Built by Applysquare and contributors with ❤️
      <Link to="/about">About us</Link>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { Link } from "gatsby";
import { v4 } from "uuid";
import {
  RightOutlined,
  TeamOutlined,
  DatabaseOutlined,
  EditOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { makePage } from "../../components/Layout";
import { resource } from "../../components/const";
import GoBack from "../../components/GoBack";

const goBack = {
  title: "返回",
  customStyle: {
    fontSize: "16px",
  },
};

const icons = {
  team: <TeamOutlined />,
  database: <DatabaseOutlined />,
  edit: <EditOutlined />,
  smile: <SmileOutlined />,
};

const PageCore = () => {
  return (
    <div className="resource-page">
      <div style={{ marginBottom: "20px" }}>
        <GoBack {...goBack} />
        <div className="flex-space-betwwen" style={{ marginTop: "32px" }}>
          <div style={{ fontSize: "20px" }}>交流与资源建设</div>
          <Link className="about" to="/about">
            了解项目
          </Link>
        </div>
        {(resource || []).map((item) => {
          return (
            <div key={v4()} className="content-wrapper">
              <div
                className="flex-flex-start"
                style={{
                  marginBottom: "7px",
                }}
              >
                <span className="icon">{icons[item.icon]}</span>
                <span className="title">{item.title}</span>
              </div>
              {(item.children || []).map((list) => {
                return (
                  <a
                    className="flex-space-betwwen item-wrapper"
                    key={v4()}
                    href={list.link}
                  >
                    <div style={{ maxWidth: "80%" }}>
                      <div className="up-txt">{list.upTxt}</div>
                      <div className="under-txt">{list.underTxt}</div>
                    </div>
                    <div
                      className="flex-space-betwwen"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      <span className="operation">{list.operation}</span>
                      <RightOutlined />
                    </div>
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
      <a
        className="footer-link"
        href="https://github.com/applysquare/covid19-datahub"
      >
        前往covid19-datahub共建资源
      </a>
    </div>
  );
};

const Page = makePage(PageCore, {});

export default Page;

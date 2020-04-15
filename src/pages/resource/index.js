import React from "react";
import { Link } from "gatsby";
import { v4 } from "uuid";
import {
  LeftOutlined,
  RightOutlined,
  TeamOutlined,
  DatabaseOutlined,
  EditOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { makePage } from "../../components/Layout";
import { resource } from "../../components/const";
import { goBack } from "../../components/display";

const styles = {
  logoTitle: {
    fontSize: "16px",
    color: "#FFFFFF",
    padding: "10px 0 0 2px",
  },
  footerLink: {
    color: "#FFFFFF",
    fontSize: "16px",
    background: "#1A6DFF",
    textAlign: "center",
    padding: "8px 0",
    margin: "10px 15px",
    display: "block",
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
    color: "#333333",
  },
  flexParent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "16px",
    fontWeight: 500,
    color: "rgba(76,76,76,1)",
  },
  upTxt: {
    fontWeight: 500,
    fontSize: "16px",
    color: "rgba(51,51,51,1)",
  },
  underTxt: {
    fontSize: "14px",
    color: "rgba(113,113,113,1)",
    marginTop: "5px",
    fontWeight: 400,
  },
  operation: {
    fontSize: "14px",
    color: "rgba(153,153,153,1)",
    paddingRight: "6px",
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
    <div style={{ background: "#ffffff" }}>
      <div style={styles.logoTitle}>
        <a style={styles.link} href="###" onClick={(e) => goBack(e)}>
          <LeftOutlined />
          <span style={{ padding: "0 4px" }}>返回</span>
        </a>
      </div>
      <div style={{ padding: "15px", marginTop: "15px" }}>
        <div style={styles.flexParent}>
          <div style={{ fontSize: "20px" }}>交流与资源建设</div>
          <Link style={{ color: "rgba(26,109,255,1)" }} to="/about">
            了解项目
          </Link>
        </div>
        {(resource || []).map((item) => {
          return (
            <div key={v4()} style={{ marginTop: "30px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "7px",
                }}
              >
                <span
                  style={{ color: "rgba(24,144,255,1)", marginRight: "4px" }}
                >
                  {icons[item.icon]}
                </span>
                <span style={styles.title}>{item.title}</span>
              </div>
              {(item.children || []).map((list) => {
                return (
                  <a key={v4()} href={list.link} style={styles.link}>
                    <div
                      style={{
                        ...styles.flexParent,
                        padding: "15px 10px 15px 0",
                        borderBottom: "1px solid #E4E4E4",
                      }}
                    >
                      <div style={{ maxWidth: "80%" }}>
                        <div style={styles.upTxt}>{list.upTxt}</div>
                        <div style={styles.underTxt}>{list.underTxt}</div>
                      </div>
                      <div
                        style={{
                          ...styles.flexParent,
                          fontSize: "14px",
                        }}
                      >
                        <span style={styles.operation}>{list.operation}</span>
                        <RightOutlined />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
      <a
        href="https://github.com/applysquare/covid19-datahub"
        style={styles.footerLink}
      >
        前往covid19-datahub共建资源
      </a>
    </div>
  );
};

const Page = makePage(PageCore, {});

export default Page;

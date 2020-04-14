import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "gatsby";
// import { v4 } from "uuid";
import { makePage } from "../../components/Layout";

const styles = {
  flexParent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: "20px",
    margin: "30px 0 24px 0"
  },
  link: {
    textDecoration: "none",
    color: "#333333"
  },
  nameCn: {
    fontSize: "16px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  stateCn: {
    paddingRight: "6px"
  }
};

const PageCore = ({ data }) => {
  return (
    <div style={{ background: "#ffffff" }}>
      <div style={{ padding: "15px" }}>
        <div style={styles.flexParent}>
          <div style={styles.title}>交流与资源建设</div>
          <a href="###">了解项目</a>
        </div>
        {/* {institute.map(edge => { */}
        {/* return ( */}
        <Link style={styles.link}>
          <div
            style={{
              ...styles.flexParent,
              padding: "15px 10px",
              borderBottom: "1px solid #E4E4E4"
            }}
          >
            <div style={{ maxWidth: "80%" }}>
              <div style={styles.nameCn}>征集回答</div>
              <div style={{ ...styles.nameCn, fontSize: "12px" }}>
                发布你的问题，征集回答
              </div>
            </div>
            <div
              style={{
                ...styles.flexParent,
                fontSize: "14px"
              }}
            >
              <span style={styles.stateCn}>提问</span>
              <RightOutlined />
            </div>
          </div>
        </Link>
        {/* );
        })} */}
      </div>
    </div>
  );
};

const Page = makePage(PageCore);

export default Page;

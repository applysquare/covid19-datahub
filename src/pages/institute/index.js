import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../../components/Layout";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "gatsby";

const styles = {
  flexParent: {
    display: "flex",
    // justifyContent: "space-around",
    flexWrap: "wrap",
  },
  tabItem: {
    padding: "8px 0",
    textAlign: "center",
    pointer: "cursor",
    flex: 1,
    background: "#F1F1F1",
    textDecoration: "none",
    color: "#333333",
  },
  triangle: {
    width: 0,
    height: 0,
    display: "inline-block",
    background: "transparent",
    borderTop: "0px solid transparent",
    // borderTop: "40px solid white",
    borderRight: "6px solid white",
    borderLeft: "10px solid transparent",
  },
  title: {
    fontSize: "20px",
    marginTop: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#333333",
  },
  nameCn: {
    fontSize: "16px",
  },
  nameEn: {
    fontSize: "12px",
  },
  stateCn: {
    paddingRight: "6px",
  },
  countryCn: {
    background: "#FFFFFF",
    borderRadius: "4px",
    border: "1px solid rgba(228,228,228,1)",
    padding: "6px 16px",
    fontSize: "14px",
    color: "#999999",
    margin: "16px 0",
  },
};
const country = ["美国", "英国", "加拿大", "澳大利亚"];
const PageCore = ({ data }) => {
  return (
    <div style={{ background: "#ffffff" }}>
      <div style={styles.flexParent}>
        <Link style={styles.tabItem} to="/">
          全球动态
        </Link>
        <div style={styles.triangle}></div>
        <Link
          style={{ ...styles.tabItem, background: "#ffffff", color: "#1A6DFF" }}
        >
          院校数据
        </Link>
      </div>
      <div style={{ padding: "15px" }}>
        <div style={styles.title}>选择院校，了解院校安全发展动态</div>
        <div style={styles.flexParent}>
          {country.map((item, index) => {
            return (
              <div
                style={{
                  ...styles.countryCn,
                  marginLeft: `${index === 0 ? "0px" : "8px"}`,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        {data.allInstitute.edges.map((edge) => {
          const { node } = edge;
          return (
            <Link
              style={styles.link}
              to={node.fields.pathname}
              key={node.fields.pathname}
            >
              <div
                style={{
                  ...styles.flexParent,
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 10px",
                  borderBottom: "1px solid #E4E4E4",
                }}
                key={node.id}
              >
                <div>
                  <div style={styles.nameCn}>{node.nameCn}</div>
                  <div style={styles.nameEn}>{node.nameEn}</div>
                </div>
                <div
                  style={{
                    ...styles.flexParent,
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={styles.stateCn}>{node.stateCn}</span>
                  <RightOutlined />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Page = makePage(PageCore);

export default Page;

export const pageQuery = graphql`
  query InstituteListPage {
    allInstitute(sort: { fields: [countryCode, nameEn] }) {
      edges {
        node {
          id
          nameCn
          nameEn
          fields {
            pathname
          }
        }
      }
    }
  }
`;

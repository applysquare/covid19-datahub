import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { LeftOutlined } from "@ant-design/icons";
import { makePage } from "../components/Layout";
import Help from "../components/Help";
import InfoList from "../components/InfoList";
import NewList from "../components/NewList";
import { translateCourseOperationStatus } from "../components/display";

const help = {
  title: "问题解答征集",
  linkTxt: "在海外遇到了问题？你有解决办法？来这里互助",
  linkTo:
    "https://github.com/applysquare/covid19-datahub#%E6%88%91%E8%A6%81%E6%B1%82%E5%8A%A9"
};

const styles = {
  countryBox: {
    background: "#FFFFFF",
    padding: "20px 15px"
  },
  title: {
    color: "#333333",
    fontWeight: 500,
    fontSize: "18px",
    marginBottom: "24px"
  },
  returnBox: {
    color: "#333333",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "30px"
  },
  flexParent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    textAlign: "center"
  },
  flexChild: {
    padding: "24px 0 10px 0"
  },
  statusTxt: {
    color: "#333333",
    fontSize: "14px"
  },
  statusNum: {
    fontSize: "20px"
  },
  instituteBox: {
    padding: "24px 15px 20px",
    background: "#FFFFFF",
    marginTop: "10px",
    boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.08)"
  },
  institutePic: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#D8D8D8",
    margin: "0 auto"
  },
  instituteName: { color: "#333333", marginTop: "8px", textAlign: "center" },
  instituteNameMore: {
    maxWidth: "128px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "14px"
  },
  infoBox: {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "20px 10px"
  },
  link: {
    textDecoration: "none"
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    padding: "5px",
    display: "inline-block",
    textDecoration: "underline",
    cursor: "pointer"
  }
};

const sliceArr = (arr = [], num = 0) => {
  return arr.length > num ? arr.slice(0, num) : arr;
};

export const AreaPageCore = ({ data }) => {
  const { area, updates, articles, allInstitute } = data;

  const [infoEdges, setInfoEdges] = useState([]);
  const [more, setMore] = useState(null);

  const [institutes, setInstitutes] = useState([]);
  const [institutesMore, setInstitutesMore] = useState(null);

  useEffect(() => {
    const infoEdges = sliceArr(articles?.edges, 3);
    const institutes = sliceArr(allInstitute?.edges, 6);
    setInfoEdges(infoEdges);
    setMore(false);

    setInstitutes(institutes);
    setInstitutesMore(false);
  }, [articles, allInstitute]);

  const clickMore = () => {
    setInfoEdges(articles?.edges);
    setMore(true);
  };

  const clickInstitutesMore = () => {
    setInstitutes(allInstitute?.edges);
    setInstitutesMore(true);
  };
  return (
    <div style={{ background: "rgba(241,241,241,0.8)" }}>
      <div style={styles.countryBox}>
        <div>
          <Link style={styles.returnBox} to="/">
            <LeftOutlined />
            <span style={{ paddingLeft: "5px" }}>全球动态</span>
          </Link>
        </div>
        <div>
          <div>
            <span style={{ ...styles.title, fontSize: "24px" }}>
              {area?.titleCn}
            </span>
            <span
              style={{ color: "#666666", fontsize: "14px", padding: "8px" }}
            >
              United States
            </span>
          </div>

          <div style={styles.flexParent}>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>确诊</div>
              <div style={{ ...styles.statusNum, color: "#EB5449" }}>
                123222
              </div>
            </div>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>新增</div>
              <div style={{ ...styles.statusNum, color: "#FDBB0F" }}>72832</div>
            </div>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>死亡</div>
              <div style={{ ...styles.statusNum, color: "#333333" }}>72832</div>
            </div>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>治愈</div>
              <div style={{ ...styles.statusNum, color: "#1EC5A0" }}>832</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.instituteBox}>
        <div style={{ ...styles.flexParent, justifyContent: "space-between" }}>
          <div style={styles.title}>{area?.titleCn}院校实况</div>
          <span
            style={{
              ...styles.more,
              display: `${institutesMore ? "none" : "inline-block"}`
            }}
            role="button"
            onClick={clickInstitutesMore}
            onKeyPress={clickInstitutesMore}
          >
            更多
          </span>
        </div>
        <div style={styles.flexParent}>
          {(institutes || []).map(edge => {
            return (
              <Link
                style={{
                  ...styles.link,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
                key={edge?.node?.id}
                to={edge?.node?.fields?.pathname}
              >
                <div style={styles.institutePic}></div>
                <div
                  style={{
                    ...styles.instituteName,
                    ...styles.instituteNameMore
                  }}
                >
                  {edge?.node?.nameCn}
                </div>
                <div
                  style={{
                    ...styles.instituteName,
                    color: "#333333",
                    fontSize: "12px"
                  }}
                >
                  {translateCourseOperationStatus('cn', edge?.node?.courseOperationStatus)}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Help {...help} />

      <div style={{ background: "#FFFFFF", padding: "15px" }}>
        <div style={styles.infoBox}>
          <div
            style={{ ...styles.title, fontSize: "18px", marginBottom: "10px" }}
          >
            资料区
          </div>
          <InfoList infoEdges={infoEdges} />
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                ...styles.more,
                display: `${more ? "none" : "inline-block"}`
              }}
              role="button"
              onClick={clickMore}
              onKeyPress={clickMore}
            >
              展开全部
            </span>
          </div>
        </div>
        <div>
          <div
            style={{
              ...styles.title,
              margin: "30px 0 22px 0"
            }}
          >
            全球资讯
          </div>
          <NewList newEdges={updates?.edges} />
        </div>
      </div>
      <p />
    </div>
  );
};

const Page = makePage(AreaPageCore, {
  srcPath: "/src/templates/area-page.js"
});
export default Page;

export const pageQuery = graphql`
  query AreaPage($id: String!, $countryCode: String!) {
    area(id: { eq: $id }) {
      id
      countryCode
      titleCn
    }
    allInstitute(filter: { countryCode: { eq: $countryCode } }) {
      edges {
        node {
          courseOperationStatus
          id
          nameCn
          website
          stateCn
          fields {
            pathname
          }
        }
      }
    }
    updates: allMarkdownRemark(
      filter: {
        fields: { templateKey: { eq: "update-page" } }
        frontmatter: { countryCode: { eq: $countryCode } }
      }
    ) {
      edges {
        node {
          id
          fields {
            pathname
          }
          frontmatter {
            title
          }
        }
      }
    }
    articles: allMarkdownRemark(
      filter: {
        fields: { templateKey: { eq: "article-page" } }
        frontmatter: { countryCode: { eq: $countryCode } }
      }
    ) {
      edges {
        node {
          id
          fields {
            pathname
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

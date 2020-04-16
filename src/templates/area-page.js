import React from "react";
import { graphql, Link } from "gatsby";
import { LeftOutlined } from "@ant-design/icons";
import { makePage } from "../components/Layout";
import Help from "../components/Help";
import InfoList from "../components/InfoList";
import NewList from "../components/NewList";
import {
  translateCourseOperationStatus,
  sliceArr,
  goBack,
} from "../components/display";

const help = {
  title: "交流与资源建设",
  linkTxt: "有困难有问题？有资源有爱心？来这里",
  linkTo: "/resource",
};
// 之后换成网页端交流与资源建设页面入口

const styles = {
  countryBox: {
    background: "#FFFFFF",
    padding: "20px 15px",
  },
  title: {
    color: "#333333",
    fontWeight: 500,
    fontSize: "18px",
    marginBottom: "24px",
  },
  returnBox: {
    color: "#333333",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "30px",
  },
  flexParent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    textAlign: "center",
  },
  flexChild: {
    padding: "24px 0 10px 0",
  },
  statusTxt: {
    color: "#333333",
    fontSize: "14px",
  },
  statusNum: {
    fontSize: "20px",
  },
  instituteBox: {
    padding: "24px 15px 20px",
    background: "#FFFFFF",
    marginTop: "10px",
    boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.08)",
  },
  institutePic: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#FFFFFF",
    margin: "0 auto",
  },
  instituteName: { color: "#333333", marginTop: "8px", textAlign: "center" },
  instituteNameMore: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "14px",
  },
  infoBox: {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "20px 10px",
  },
  link: {
    textDecoration: "none",
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    padding: "5px",
    display: "inline-block",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export const AreaPageCore = ({ data }) => {
  const { area, updates, articles, allInstitute } = data;
  const covid19Area = data?.covid19Area?.data;
  const infoEdges = articles?.edges || [];
  const institutes = sliceArr(allInstitute?.edges, 8);
  // const institutes = allInstitute?.edges;

  return (
    <div style={{ background: "rgba(241,241,241,0.8)" }}>
      <div style={styles.countryBox}>
        <div>
          <a href="###" style={styles.returnBox} onClick={(e) => goBack(e)}>
            <LeftOutlined />
            <span style={{ paddingLeft: "5px" }}>全球动态</span>
          </a>
        </div>
        <div>
          <div>
            <span style={{ ...styles.title, fontSize: "24px" }}>
              {area?.titleCn}
            </span>
            <span
              style={{ color: "#666666", fontsize: "14px", padding: "8px" }}
            >
              {area?.titleEn}
            </span>
          </div>

          <div style={styles.flexParent}>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>确诊</div>
              <div style={{ ...styles.statusNum, color: "#EB5449" }}>
                {covid19Area?.totalConfirmed || "-"}
              </div>
            </div>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>新增</div>
              <div style={{ ...styles.statusNum, color: "#FDBB0F" }}>
                {covid19Area?.totalConfirmedDelta || "-"}
              </div>
            </div>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>死亡</div>
              <div style={{ ...styles.statusNum, color: "#333333" }}>
                {covid19Area?.totalDeaths || "-"}
              </div>
            </div>
            <div style={styles.flexChild}>
              <div style={styles.statusTxt}>治愈</div>
              <div style={{ ...styles.statusNum, color: "#1EC5A0" }}>
                {covid19Area?.totalRecovered || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.instituteBox}>
        <div style={{ ...styles.flexParent, justifyContent: "space-between" }}>
          <div style={styles.title}>{area?.titleCn}院校实况</div>
          <Link
            style={{
              ...styles.more,
            }}
            to="/institute"
          >
            更多
          </Link>
        </div>
        <div style={{ ...styles.flexParent, justifyContent: "flex-start" }}>
          {(institutes || []).map((edge) => {
            return (
              <Link
                style={{
                  ...styles.link,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: "12px",
                  width: "25%",
                }}
                key={edge?.node?.id}
                to={edge?.node?.fields?.pathname}
              >
                <div style={styles.institutePic}>
                  <img
                    src={edge?.node?.logo}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  style={{
                    ...styles.instituteName,
                    ...styles.instituteNameMore,
                  }}
                >
                  {edge?.node?.nameCn}
                </div>
                <div
                  style={{
                    ...styles.instituteName,
                    color: "#333333",
                    fontSize: "12px",
                  }}
                >
                  {translateCourseOperationStatus(
                    "cn",
                    edge?.node?.courseOperationStatus
                  )}
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
            {area?.titleCn}资料区
          </div>
          <InfoList infoEdges={infoEdges} />
        </div>
        <div>
          <div
            style={{
              ...styles.title,
              margin: "30px 0 22px 0",
            }}
          >
            {area?.titleCn}资讯
          </div>
          <NewList newEdges={updates?.edges} />
        </div>
      </div>
      <p />
    </div>
  );
};

const Page = makePage(AreaPageCore, {
  srcPath: "/src/templates/area-page.js",
});
export default Page;

export const pageQuery = graphql`
  query AreaPage(
    $id: String!
    $countryCode: String!
    $hasApiCode: Boolean!
    $apiCode: String
  ) {
    area(id: { eq: $id }) {
      id
      countryCode
      titleCn
      titleEn
    }
    covid19Area(data: { id: { eq: $apiCode } }) @include(if: $hasApiCode) {
      data {
        displayName
        id
        totalConfirmed
        totalConfirmedDelta
        totalDeaths
        totalDeathsDelta
        totalRecovered
      }
    }
    allInstitute(filter: { countryCode: { eq: $countryCode } }) {
      edges {
        node {
          courseOperationStatus
          id
          logo
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
        frontmatter: { countryCode: { eq: $countryCode }, instituteSlug: { eq:'' }}
      }
    ) {
      edges {
        node {
          html
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

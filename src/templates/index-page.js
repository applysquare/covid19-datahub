import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { v4 } from "uuid";
// import ArticleList from "../components/ArticleList";
import { makePage } from "../components/Layout";
import Help from "../components/Help";
import InfoList from "../components/InfoList";
import NewList from "../components/NewList";
import AllAreaCases from "../components/AllAreaCases";
import { help } from "../components/const";
import { sliceArr } from "../components/display";
import indexTitleImg from "../img/indexTitleImg.png";

// 之后换成网页端交流与资源建设页面入口

const styles = {
  title: {
    color: "#333333",
    fontWeight: 500,
    fontSize: "18px",
    marginBottom: "24px",
  },
  titleImg: {
    width: "100%",
  },
  flexParent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  safetyBox: {
    padding: "30px 15px",
    marginTop: "10px",
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px 0px rgba(0,0,0,0.08)}",
  },
  areaName: {
    color: "#333333",
    fontSize: "14px",
    fontWeight: 500,
  },
  instituteBox: {
    padding: "24px 15px 20px",
    background: "#FFFFFF",
    boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.08)",
  },
  institutePic: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#D8D8D8",
    margin: "0 auto",
  },
  instituteName: { color: "#333333", marginTop: "8px", textAlign: "center" },
  infoBox: {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "20px 10px",
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
  },
  tabItem: {
    padding: "8px 0",
    textAlign: "center",
    pointer: "cursor",
    flex: 1,
    textDecoration: "none",
    color: "#333333",
  },
  triangle: {
    width: 0,
    height: 0,
    display: "inline-block",
    background: "transparent",
    borderTop: "0px solid transparent",
    borderBottom: "40px solid white",
    borderLeft: "6px solid white",
    borderRight: "10px solid transparent",
  },
};

export const IndexPageCore = ({ data, errors }) => {
  const config = data.pageIndexYml;
  const { articles, allCovid19Area, allArea, updates } = data;

  const allAreaCases =
    allArea?.edges
      .map((item) => {
        const obj = allCovid19Area?.edges.find((edge) => {
          return edge?.node?.data?.id === item?.node?.bingApiId;
        });
        return { ...obj, countryCode: item?.node?.countryCode };
      })
      .filter(Boolean) || [];

  // 疫情重点国家
  const getApiData = (apiCode) => {
    return allCovid19Area?.edges.find((edge) => {
      return edge?.node?.data?.id === apiCode;
    })?.node?.data;
  };

  const infoEdges = articles?.edges || [];
  const [allStudyArea, setAllStudyArea] = useState([]);
  const [isAreaMore, setIsAreaMore] = useState(null);
  const [isCasesMore, setIsCasesMore] = useState(null);
  useEffect(() => {
    setIsCasesMore(false);
    setIsAreaMore(false);
    setAllStudyArea(sliceArr(data?.allArea?.edges, 4));
  }, [data]);
  const getMoreCases = (e) => {
    e.preventDefault();
    setIsCasesMore(!isCasesMore);
  };
  const getMoreArea = (e) => {
    e.preventDefault();
    const arr = isAreaMore
      ? sliceArr(data?.allArea?.edges, 4)
      : data?.allArea?.edges || [];
    setAllStudyArea(arr);
    setIsAreaMore(!isAreaMore);
  };

  return (
    <div style={{ background: "rgba(241,241,241,0.8)" }}>
      <div>
        <Link to="/about">
          <img style={styles.titleImg} src={indexTitleImg} alt="" />
        </Link>
      </div>
      <div style={styles.flexParent}>
        <Link
          style={{
            ...styles.tabItem,
            background: "#ffffff",
            color: "#1A6DFF",
          }}
        >
          全球动态
        </Link>
        <div style={styles.triangle}></div>
        <Link style={styles.tabItem} to="/institute/us">
          院校数据
        </Link>
      </div>
      <div style={styles.instituteBox}>
        <div style={{ ...styles.flexParent, justifyContent: "space-between" }}>
          <div style={styles.title}>留学生数据中心</div>
          <a style={styles.more} href="###" onClick={(e) => getMoreArea(e)}>
            {isAreaMore ? "收起" : "更多"}
          </a>
        </div>
        <div style={{ ...styles.flexParent, justifyContent: "flex-start" }}>
          {allStudyArea.map((area) => {
            return (
              <Link
                key={v4()}
                style={{
                  ...styles.link,
                  textAlign: "center",
                  width: "25%",
                  marginBottom: "12px",
                }}
                to={area?.node?.fields?.pathname}
              >
                <div style={styles.institutePic}>
                  <img
                    src={area?.node?.icon}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div style={styles.instituteName}>{area?.node?.titleCn}</div>
              </Link>
            );
          })}
        </div>
      </div>
      <div style={styles.safetyBox}>
        {/* <div style={{ ...styles.flexParent, justifyContent: "space-between" }}> */}
        <div style={styles.title}>全球健康安全</div>
        <div
          style={{
            ...styles.flexParent,
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <div style={{ ...styles.title, fontSize: "16px" }}>各地确诊数据</div>
          <a style={styles.more} href="###" onClick={(e) => getMoreCases(e)}>
            {isCasesMore ? "收起" : "更多"}
          </a>
        </div>
        <div style={{ ...styles.flexParent, justifyContent: "flex-start" }}>
          {config?.highlightAreas.map((area) => {
            const apiData = getApiData(area.apiCode);
            return (
              <Link
                key={area?.link}
                style={{
                  ...styles.link,
                  textAlign: "center",
                  width: "25%",
                  marginBottom: "12px",
                }}
                to={area?.link}
              >
                <div style={styles.areaName}>{area?.name}</div>
                <div style={{ color: "#EB5449", fontSize: "20px" }}>
                  {apiData?.totalConfirmed ?? "-"}
                </div>
                <div style={{ fontSize: "8px" }}>
                  <span style={{ color: "#999999" }}>新增:</span>
                  <span style={{ color: "#EB5449" }}>
                    {apiData?.totalConfirmedDelta
                      ? `+${apiData?.totalConfirmedDelta}`
                      : "-"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        {isCasesMore && <AllAreaCases data={allAreaCases} />}
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
        </div>
        <div>
          <div
            style={{
              ...styles.title,
              margin: "30px 0 22px 0",
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

const Page = makePage(IndexPageCore, {
  srcPath: "/src/templates/index-page.js",
  // footer: false,
});
export default Page;

export const pageQuery = graphql`
  query IndedxPage {
    pageIndexYml {
      highlightAreas {
        name
        link
        apiCode
      }
    }
    allArea(sort: { order: ASC, fields: ranking }) {
      edges {
        node {
          countryCode
          icon
          id
          titleCn
          bingApiId
          fields {
            pathname
          }
        }
      }
    }
    allCovid19Area {
      edges {
        node {
          id
          data {
            id
            displayName
            totalConfirmedDelta
            totalConfirmed
            totalRecovered
            totalDeaths
            totalRecoveredDelta
          }
        }
      }
    }
    updates: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { templateKey: { eq: "update-page" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            pathname
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { templateKey: { eq: "article-page" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            pathname
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

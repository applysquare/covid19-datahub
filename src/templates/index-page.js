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

// 之后换成网页端交流与资源建设页面入口

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
    <div className="index-page">
      <Link to="/about">
        <div className="banner"></div>
      </Link>
      <div className="flex-space-around" style={{ alignItems: "inherit" }}>
        <Link
          className="tab-item"
          style={{
            background: "#ffffff",
            color: "#1A6DFF",
          }}
        >
          全球动态
        </Link>
        <div className="triangle"></div>
        <Link className="tab-item" to="/institute/us">
          院校数据
        </Link>
      </div>
      <div className="all-study-area-wrapper">
        <div className="title-box">
          <div className="title">留学生数据中心</div>
          <a className="more" href="###" onClick={(e) => getMoreArea(e)}>
            {isAreaMore ? "收起" : "更多"}
          </a>
        </div>
        <div className="flex-flex-start">
          {allStudyArea.map((area) => {
            return (
              <Link
                className="flex-item"
                key={v4()}
                to={area?.node?.fields?.pathname}
              >
                <div className="logo">
                  <img src={area?.node?.icon} alt="" />
                </div>
                <div className="title-cn">{area?.node?.titleCn}</div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="safety-wrapper">
        <div className="title" style={{ marginBottom: "24px" }}>
          全球健康安全
        </div>
        <div className="title-box">
          <div className="title" style={{ fontSize: "16px" }}>
            各地确诊数据
          </div>
          <a className="more" href="###" onClick={(e) => getMoreCases(e)}>
            {isCasesMore ? "收起" : "更多"}
          </a>
        </div>
        <div className="flex-flex-start">
          {config?.highlightAreas.map((area) => {
            const apiData = getApiData(area.apiCode);
            return (
              <Link className="flex-item" key={area?.link} to={area?.link}>
                <div className="name">{area?.name}</div>
                <div style={{ color: "#EB5449", fontSize: "20px" }}>
                  {apiData?.totalConfirmed ?? "-"}
                </div>
                <div style={{ fontSize: "12px" }}>
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
      <div className="info-new-box">
        <div className="info-wrapper">
          <div className="title info-title">资料区</div>
          <InfoList infoEdges={infoEdges} />
        </div>
        <div className="new-wrapper">
          <div className="title new-title">全球资讯</div>
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
      filter: { fields: { templateKey: { eq: "article-page" } }
      frontmatter: {
          countryCode: {in: [null, ""]}
        }
      }
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

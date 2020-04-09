import React from "react";
import { makePage } from "../components/Layout";
import { graphql, Link } from "gatsby";
// import ArticleList from "../components/ArticleList";
import NewList from "../components/NewList";
import InfoList from "../components/InfoList";
import Help from "../components/Help";
import { v4 } from "uuid";
import indexTitleImg from "../img/indexTitleImg.png";

const instituteArr = [
  { name: "美国院校", img: "" },
  { name: "英国院校", img: "" },
  { name: "加拿大院校", img: "" },
  { name: "其他院校", img: "" },
];
const help = {
  title: "问题解答征集",
  linkTxt: "在海外遇到了问题？你有解决办法？来这里互助",
  linkTo:
    "https://github.com/applysquare/covid19-datahub#%E6%88%91%E8%A6%81%E6%B1%82%E5%8A%A9",
};

const styles = {
  title: {
    color: "#333333",
    fontWeight: 500,
    fontSize: "20px",
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
    marginTop: "10px",
    boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.08)",
  },
  institutePic: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#D8D8D8",
    margin: "0 auto",
  },
  instituteName: { color: "#333333", marginTop: "8px" },
  infoBox: {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "20px 10px",
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    padding: "5px",
    display: "inline-block",
  },
  link: {
    textDecoration: "none",
  },
};

export const IndexPageCore = ({ data, errors }) => {
  const config = data.pageIndexYml;
  const getApiData = (apiCode) => {
    return data.allCovid19Country.edges.find((edge) => {
      return edge.node.data.CountryCode === apiCode;
    })?.node?.data;
  };

  return (
    <div style={{ background: "rgba(241,241,241,0.8)" }}>
      <div>
        <h1>全球院校动态</h1>
        <div>
          <Link>
            <img style={styles.titleImg} src={indexTitleImg} alt="" />
          </Link>
        </div>
        <div></div>
        <div style={styles.safetyBox}>
          <div style={styles.title}>海外健康安全</div>
          <div style={styles.flexParent}>
            {config.highlightAreas.map((area) => {
              const apiData = getApiData(area.apiCode);
              return (
                <Link
                  key={area.link}
                  style={{ ...styles.link, textAlign: "center" }}
                >
                  <div style={styles.areaName}>{area?.name}</div>
                  <div style={{ color: "#EB5449", fontSize: "20px" }}>
                    {apiData?.TotalConfirmed}
                  </div>
                  <div style={{ fontSize: "10px" }}>
                    <span style={{ color: "#999999" }}>较昨日:</span>
                    <span style={{ color: "#EB5449" }}>
                      +{apiData?.NewConfirmed}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* <Link to="/institute">全部院校</Link> */}
        <div style={styles.instituteBox}>
          <div style={styles.title}>留学生数据中心</div>
          <div style={styles.flexParent}>
            {instituteArr.map((institute) => {
              return (
                <Link key={v4()} style={styles.link}>
                  <div style={styles.institutePic}></div>
                  <div style={styles.instituteName}>{institute?.name}</div>
                </Link>
              );
            })}
          </div>
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
          <InfoList infoEdges={data.articles.edges} />
          {/* <Link to="/article">更多资料</Link> */}

          <div style={{ textAlign: "center" }}>
            <Link style={styles.more} to="/article">
              展开全部
            </Link>
          </div>
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
          <NewList newEdges={data.updates.edges} />
        </div>
      </div>
    </div>
  );
};

const Page = makePage(IndexPageCore, {
  srcPath: "/src/templates/index-page.js",
  footer: false,
});
export default Page;

export const pageQuery = graphql`
  query IndedxPage($apiCodes: [String]) {
    pageIndexYml {
      highlightAreas {
        name
        link
        apiCode
      }
    }
    allCovid19Country(filter: { data: { CountryCode: { in: $apiCodes } } }) {
      edges {
        node {
          data {
            Country
            CountryCode
            Slug
            NewConfirmed
            TotalConfirmed
          }
        }
      }
    }
    updates: allMarkdownRemark(
      limit: 5
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
      limit: 5
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

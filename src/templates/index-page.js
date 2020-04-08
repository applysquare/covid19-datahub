import React from "react";
import { makePage } from "../components/Layout";
import { graphql, Link } from "gatsby";
import ArticleList from "../components/ArticleList";
import NewList from "../components/NewList";
import { v4 } from "uuid";

const instituteArr = [
  { name: "美国院校", img: "" },
  { name: "英国院校", img: "" },
  { name: "加拿大院校", img: "" },
  { name: "其他院校", img: "" },
];

const styles = {
  title: {
    color: "#333333",
    fontWeight: 500,
    fontSize: "20px",
    marginBottom: "20px",
  },
  flexParent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  safetyBox: { padding: "30px 15px", background: "#FFFFFF" },
  areaName: {
    color: "#333333",
    fontSize: "14px",
    fontWeight: 500,
  },
  instituteBox: {
    padding: "20px 15px",
    background: "#FFFFFF",
    marginTop: "10px",
  },
  institutePic: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#D8D8D8",
    margin: "0 auto",
  },
  instituteName: { color: "#333333", marginTop: "8px" },
  questionBox: {
    margin: "15px",
    borderRadius: "4px",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    background:
      "linear-gradient(90deg,rgba(88,107,154,1) 0%,rgba(134,152,198,1) 100%)",
    padding: "20px 10px",
  },
  questionTitle: { fontSize: "18px", color: "#FFFFFF", marginBottom: "5px" },
  questionItem: { color: "#FFFFFF", fontSize: "12px", textDecoration: "none" },
  dataAreaBox: {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "20px 10px",
  },
  more: { color: "#999999", fontSize: "14px" },
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
        <div style={styles.safetyBox}>
          <div style={styles.title}>海外健康安全</div>
          <div style={styles.flexParent}>
            {config.highlightAreas.map((area) => {
              const apiData = getApiData(area.apiCode);
              return (
                <div key={area.link} style={{ textAlign: "center" }}>
                  {/* <Link to={area.link}>{area.name}</Link> */}
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
                </div>
              );
            })}
          </div>
        </div>
        {/* <Link to="/institute">全部院校</Link> */}
        <div style={styles.instituteBox}>
          <div style={styles.title}>全球院校动态</div>
          <div style={styles.flexParent}>
            {instituteArr.map((institute) => {
              return (
                <div key={v4()}>
                  <div style={styles.institutePic}></div>
                  <div style={styles.instituteName}>{institute?.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={styles.questionBox}>
        <div style={styles.questionTitle}>问题解答征集</div>
        <a
          style={styles.questionItem}
          href="https://github.com/applysquare/covid19-datahub#%E6%88%91%E8%A6%81%E6%B1%82%E5%8A%A9"
        >
          在海外遇到了问题？你有解决办法？来这里互助
        </a>
      </div>
      <div style={{ background: "#FFFFFF", padding: "15px" }}>
        <div style={styles.dataAreaBox}>
          <div style={{ ...styles.title, fontSize: "18px" }}>资料区</div>
          <ArticleList articleEdges={data.articles.edges} />
          {/* <Link to="/article">更多资料</Link> */}
          <Link style={styles.more} to="/article">
            <div style={{ textAlign: "center" }}>展开全部</div>
          </Link>
        </div>
        <div>
          <div
            style={{
              ...styles.title,
              margin: "30px 0",
            }}
          >
            全球资讯
          </div>
          <NewList newEdges={data.updates.edges} />
          {/* <ArticleList articleEdges={data.updates.edges} /> */}
          {/* <Link to="/update">更多资讯</Link> */}
        </div>
      </div>
    </div>
  );
};

const Page = makePage(IndexPageCore, {
  srcPath: "/src/templates/index-page.js",
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

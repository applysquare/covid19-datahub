import React from "react";
import { makePage } from "../components/Layout";
import { graphql, Link } from "gatsby";
import ArticleList from "../components/ArticleList";

export const IndexPageCore = ({ data, errors }) => {
  console.log(data);
  const config = data.pageIndexYml;
  const getApiData = (apiCode) => {
    return data.allCovid19Country.edges.find(edge => {
      return edge.node.data.CountryCode === apiCode;
    })?.node?.data;
  }

  return (
    <div>
      <div>
        <h1>全球院校动态</h1>
        <div>
          {config.highlightAreas.map(area => {
            const apiData = getApiData(area.apiCode);
            return (
              <div key={area.link}>
                <Link to={area.link} >
                  {area.name}
                </Link>
                <div>累计: {apiData?.TotalConfirmed}</div>
                <div>最新: {apiData?.NewConfirmed}</div>
              </div>
            );
          })}
        </div>
        <Link to='/institute'>全部院校</Link>
      </div>
      <div>
        <a href="https://github.com/applysquare/covid19-datahub#%E6%88%91%E8%A6%81%E6%B1%82%E5%8A%A9">问题解答征集</a>
      </div>
      <div>
        <h1>资料区</h1>
        <Link to='/article'>更多资料</Link>
        <ArticleList articleEdges={data.articles.edges} />
      </div>
      <div>
        <h1>全球资讯</h1>
        <Link to='/update'>更多资讯</Link>
        <ArticleList articleEdges={data.updates.edges} />
      </div>
    </div>
  );
};

const Page = makePage(IndexPageCore);
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
    allCovid19Country(filter: {data: {CountryCode: {in: $apiCodes}}}) {
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
      limit: 5,
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
      limit: 5,
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

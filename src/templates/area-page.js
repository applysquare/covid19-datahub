import React from "react";
import { graphql, Link } from "gatsby";
import { makePage } from "../components/Layout";

export const AreaPageCore = ({ data }) => {
  const { area, allInstitute, updates, articles } = data;
  return (
    <div>
      <div>
        <Link to="/">返回首页</Link>
      </div>
      <h1>{area.title}</h1>
      <h2>学校</h2>
      {allInstitute.edges.map((edge) => {
        return (
          <div key={edge.node.id}>
            <Link to={edge.node.fields.pathname}>{edge.node.name_cn}</Link>
          </div>
        );
      })}
      <h2>资讯</h2>
      {updates.edges.map((edge) => {
        return (
          <div key={edge.node.id}>
            <Link to={edge.node.fields.pathname}>
              {edge.node.frontmatter.title}
            </Link>
          </div>
        );
      })}
      <h2>资料</h2>
      {articles.edges.map((edge) => {
        return (
          <div key={edge.node.id}>
            <Link to={edge.node.fields.pathname}>
              {edge.node.frontmatter.title}
            </Link>
          </div>
        );
      })}
      <p />
    </div>
  );
};

const Page = makePage(AreaPageCore, {
  srcPath: "/src/templates/area-page.js",
});
export default Page;

export const pageQuery = graphql`
  query AreaPage($id: String!, $countryCode: String!) {
    area(id: { eq: $id }) {
      id
      countryCode
      title
    }
    allInstitute(filter: { countryCode: { eq: $countryCode } }) {
      edges {
        node {
          id
          nameCn
          website
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

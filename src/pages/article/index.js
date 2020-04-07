import React from "react";
import { makePage } from "../../components/Layout";
import { graphql } from 'gatsby';
import ArticleList from "../../components/ArticleList";

const PageCore = ({ data }) => {
  return <div>
    <h1>资料库</h1>
    <ArticleList articleEdges={data.allMarkdownRemark.edges} />
  </div>;
};

const Page = makePage(PageCore);
export default Page;

export const pageQuery = graphql`
query ArticlePageQuery {
  allMarkdownRemark(
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
          link
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
`
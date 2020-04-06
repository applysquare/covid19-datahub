import React from "react";
import { makePage } from "../../components/Layout";
import { graphql } from 'gatsby';
import ArticleList from "../../components/ArticleList";

const PageCore = ({ data }) => {
  return <div>
    <h1>资讯库</h1>
    <ArticleList articleEdges={data.allMarkdownRemark.edges} />
  </div>;
};

const Page = makePage(PageCore);
export default Page;

export const pageQuery = graphql`
query UpdateListQuery {
  allMarkdownRemark(
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
          link
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
`
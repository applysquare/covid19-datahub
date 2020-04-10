import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../components/Layout";
import { ArticleView } from "../components/ArticleView";

export const ArticlePageCore = ({ data }) => {
  return <ArticleView markdownRemark={data?.markdownRemark} />;
};

const Page = makePage(ArticlePageCore);
export default Page;

export const pageQuery = graphql`
  query ArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        link
      }
    }
  }
`;

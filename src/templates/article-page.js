import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../components/Layout";

export const ArticlePageCore = ({ data }) => {
  const article = data?.markdownRemark;
  return (
    <div>
      <h1>{article?.frontmatter?.title}</h1>
      <p>
        链接：<a href={article?.frontmatter?.link}>link</a>
      </p>
    </div>
  );
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

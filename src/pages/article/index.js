import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../../components/Layout";
import InfoList from "../../components/InfoList";

const styles = {
  box: {
    padding: "20px 15px"
  }
};

const PageCore = ({ data }) => {
  return (
    <div style={styles.box}>
      <div>资料区</div>
      <InfoList infoEdges={data.allMarkdownRemark.edges} />
    </div>
  );
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
`;

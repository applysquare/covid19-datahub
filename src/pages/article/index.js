import React from "react";
import { makePage } from "../../components/Layout";
import { graphql } from 'gatsby';

const PageCore = ({ data }) => {
  return <div>
    <h1>资料库</h1>
    {
      data.allMarkdownRemark.edges.map(edge => {
        return (<div key={edge.node.id}>
          <h2>{edge.node.frontmatter.title}</h2>
          <div>
            website:
            <a href={edge.node.frontmatter.link}>{edge.node.frontmatter.link}
            </a>
          </div>
        </div>);
      })
    }
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
          templateKey
        }
        frontmatter {
          title
          link
          date(formatString: "MMMM DD, YYYY")
          featuredpost
        }
      }
    }
  }
}
`
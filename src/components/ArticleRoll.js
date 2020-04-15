import { Link, graphql, StaticQuery } from "gatsby";
import React from "react";

const ArticleRoll = data => {
  const articles = data?.data?.allMarkdownRemark?.edges ?? [];
  return (
    <div>
      {articles.map(artData => {
        const art = artData?.node?.frontmatter;
        return (
          <Link key={artData?.node?.id} to={artData?.node?.fields?.pathname}>
            <h2>{art?.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query ArticleRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "article-page" } } }
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
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => {
      return <ArticleRoll data={data} />;
    }}
  />
);

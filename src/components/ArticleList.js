import { Link } from "gatsby";
import React from "react";

const ArticleList = ({ articleEdges }) => {
  return (
    <div>
      {articleEdges && articleEdges.map(edge => {
        const art = edge?.node?.frontmatter;
        return (
          <Link key={edge?.node?.id} to={edge?.node?.fields?.pathname}>
            <h2>{art?.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleList;

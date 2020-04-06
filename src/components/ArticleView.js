import React from "react";
import { HTMLContent } from '../components/Content';

export const ArticleView = ({ markdownRemark }) => {
  const article = markdownRemark;
  return (
    <div>
      <h1>{article?.frontmatter?.title}</h1>
      <div>{article.frontmatter.date}</div>
      <div>
        {article?.frontmatter?.link && <a href={article?.frontmatter?.link}>原文链接</a>}
      </div>
      <div>
        <HTMLContent
          content={article.html}
        />
      </div>
    </div>
  );
}

export default ArticleView;
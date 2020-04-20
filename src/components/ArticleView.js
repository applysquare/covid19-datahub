import React from "react";
import { HTMLContent } from "../components/Content";
import GoBack from "../components/GoBack";

const goBack = {
  title: "返回",
  customStyle: {
    fontSize: "16px",
  },
};

const styles = {
  box: {
    padding: "18px 20px",
    minHeight: "500px",
  },
  title: {
    color: "#333333",
    fontSize: "24px",
    fontWeight: 500,
    margin: "30px 0 16px 0",
  },
  date: {
    marginRight: "30px",
  },
  href: {
    color: "#666666",
  },
  flexParent: {
    color: "#666666",
    fontSize: "14px",
  },
};
export const ArticleView = ({ markdownRemark }) => {
  const article = markdownRemark;
  return (
    <div style={styles.box}>
      <GoBack {...goBack} />
      <div style={styles.title}>{article?.frontmatter?.title}</div>
      <div className="flex-flex-start" style={styles.flexParent}>
        <div style={styles.date}>{article.frontmatter?.date}</div>
        <div>
          {article?.frontmatter?.link && (
            <a style={styles.href} href={article?.frontmatter?.link}>
              原文链接
            </a>
          )}
        </div>
      </div>
      <div>
        <HTMLContent className="article-content" content={article?.html} />
      </div>
    </div>
  );
};

export default ArticleView;

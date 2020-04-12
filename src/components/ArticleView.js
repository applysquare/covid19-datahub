import React from "react";
import { HTMLContent } from "../components/Content";
import { LeftOutlined } from "@ant-design/icons";
import { goBack } from "../components/display";

const styles = {
  box: {
    padding: "18px 20px"
  },
  returnBox: {
    color: "#333333",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "30px"
  },
  title: {
    color: "#333333",
    fontSize: "24px",
    fontWeight: 500,
    marginBottom: "16px"
  },
  date: {
    marginRight: "30px"
  },
  href: {
    color: "#666666"
  },
  flexParent: {
    display: "flex",
    alignItems: "center",
    color: "#666666",
    fontSize: "14px"
  }
};
export const ArticleView = ({ markdownRemark }) => {
  const article = markdownRemark;
  return (
    <div style={styles.box}>
      <a href="###" style={styles.returnBox} onClick={goBack}>
        <LeftOutlined />
        <span style={{ paddingLeft: "5px" }}>返回</span>
      </a>
      <div style={styles.title}>{article?.frontmatter?.title}</div>
      <div style={styles.flexParent}>
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

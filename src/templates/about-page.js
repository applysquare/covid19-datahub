import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { LeftOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { goBack } from "../components/display";

const styles = {
  flexParent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
  },
  footerLink: {
    color: "#FFFFFF",
    fontSize: "16px",
    background: "#1A6DFF",
    textAlign: "center",
    padding: "8px 0",
    margin: "10px 15px",
    display: "block",
    textDecoration: "none",
  },
  linkBack: {
    textDecoration: "none",
    color: "#333333",
    fontSize: "16px",
  },
  logoTitle: {
    fontSize: "14px",
    color: "#FFFFFF",
    padding: "10px 0 0 2px",
  },
};

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <div style={styles.logoTitle}>
                  <a
                    style={styles.linkBack}
                    href="###"
                    onClick={(e) => goBack(e)}
                  >
                    <LeftOutlined />
                    <span style={{ padding: "0 4px" }}>返回</span>
                  </a>
                </div>
                <div style={styles.flexParent}>
                  <div style={{ fontSize: "20px" }}>了解项目</div>
                  <Link style={{ color: "rgba(26,109,255,1)" }} to="/resource">
                    交流与资源建设
                  </Link>
                </div>
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <a
        href="https://github.com/applysquare/covid19-datahub"
        style={styles.footerLink}
      >
        前往covid19-datahub共建资源
      </a>
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

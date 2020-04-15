import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { LeftOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

const styles = {
  link: {
    color: "#FFFFFF",
    fontSize: "16px",
    background: "#1A6DFF",
    textAlign: "center",
    padding: "8px 0",
    margin: "10px 15px",
    display: "block",
    textDecoration: "none"
  },
  linkBack: {
    textDecoration: "none",
    color: "#333333"
  },
  logoTitle: {
    fontSize: "14px",
    color: "#FFFFFF",
    padding: "10px 0 0 2px"
  }
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
                  <Link style={styles.linkBack} to="/">
                    <LeftOutlined />
                    <span style={{ padding: "0 4px" }}>返回</span>
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
        style={styles.link}
      >
        前往covid19-datahub共建资源
      </a>
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
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
  data: PropTypes.object.isRequired
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

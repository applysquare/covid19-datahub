import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import GoBack from "../components/GoBack";

const goBack = {
  title: "返回",
  customStyle: {
    fontSize: "16px",
  },
};

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="about-page">
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section" style={{ marginTop: "15px" }}>
                <GoBack {...goBack} />
                <div
                  className="flex-space-betwwen"
                  style={{ marginTop: "30px" }}
                >
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
        className="footer-link"
        href="https://github.com/applysquare/covid19-datahub"
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

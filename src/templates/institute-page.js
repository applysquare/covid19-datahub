import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../components/Layout";
import { ExternalLink } from "../components/ExternalLink";
import ArticleList from "../components/ArticleList";

const InstitutePageCore = ({ data, errors }) => {
  if (errors) {
    console.error(errors);
  }
  return (
    <div>
      <h1>{data.institute.name_cn}</h1>
      <div>{data.institute.name_en}</div>
      <div>Website: {data.institute.website}</div>
      <div>
        <div>当地确诊</div>
        <div>
          本周确诊 x
          本周新增 x
          本周死亡 x
        </div>
      </div>
      <div>
        <div>院校政策</div>
        <div>院校运转: {data.institute.course_operation_status ?? '-'}</div>
        <div>停课时间: {data.institute.online_course_start_date ?? '-'}</div>
        <div>复课时间: -</div>
        <div>依据: {
          (data.institute.course_policy_link && <ExternalLink link={data.institute.course_policy_link} />)
          || '-'}
        </div>
      </div>
      <div>
        校友问题征集
        <ExternalLink link={'https://github.com/applysquare/covid19-datahub/issues/new/choose'} />
      </div>
      <div>
        <h2>本校资料区</h2>
        <ArticleList articleEdges={data.articles.edges} />
      </div>
      <div>
        <h2>本校资讯区</h2>
        <ArticleList articleEdges={data.updates.edges} />
      </div>

    </div>
  );
};

const Page = makePage(InstitutePageCore);
export default Page;

export const pageQuery = graphql`
  query InstitutePage($id: String!, $slug: String!, $countryCode: String!) {
    area(countryCode: { eq: $countryCode }) {
      id
      countryCode
      title
    }
    institute(id: { eq: $id }) {
      id
      name_cn
      name_en
      website
      course_operation_status
      online_course_start_date
      course_policy_link
      fields {
        pathname
      }
    }
    updates: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { instituteSlug: { eq: $slug } }
        fields: { templateKey: { eq: "update-page" } } 
      }
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { 
        frontmatter: { instituteSlug: { eq: $slug } }
        fields: { templateKey: { eq: "article-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            pathname
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

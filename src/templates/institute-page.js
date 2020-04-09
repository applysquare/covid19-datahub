import React from "react";
import { graphql, Link } from "gatsby";
import { makePage } from "../components/Layout";
import { ExternalLink } from "../components/ExternalLink";
import NewList from "../components/NewList";
import InfoList from "../components/InfoList";
import Help from "../components/Help";

const help = {
  title: "校友问题征集",
  linkTxt: "在海外遇到了什么问题？告诉我们，尽力为你寻求答案",
  linkTo: "https://github.com/applysquare/covid19-datahub",
};

const styles = {
  title: {
    color: "#333333",
    fontWeight: 500,
    fontSize: "20px",
    marginBottom: "24px",
  },
  policy: {
    padding: "24px 15px",
    background: "#FFFFFF",
    marginTop: "10px",
    boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.08)",
  },
  flexParent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  flexChild: {
    textAlign: "center",
  },
  areaName: {
    fontSize: "14px",
    color: "#666666",
  },
  illnessTxt: {
    color: "#333333",
    fontSize: "14px",
  },
  illnessNum: {
    fontSize: "20px",
  },
  localEpidemicBox: {
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px 0px rgba(0,0,0,0.08)",
    padding: "24px 15px",
  },
  infoBox: {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "20px 10px",
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    padding: "5px",
    display: "inline-block",
  },
};

const InstitutePageCore = ({ data, errors }) => {
  if (errors) {
    console.error(errors);
  }
  return (
    <div style={{ background: "rgba(241,241,241,0.8)" }}>
      <h1>{data.institute.name_cn}</h1>
      <div>{data.institute.name_en}</div>
      <div>Website: {data.institute.website}</div>
      <div>
        <div>
          依据:{" "}
          {(data.institute.course_policy_link && (
            <ExternalLink link={data.institute.course_policy_link} />
          )) ||
            "-"}
        </div>
      </div>
      <div>
        校友问题征集
        <ExternalLink
          link={
            "https://github.com/applysquare/covid19-datahub/issues/new/choose"
          }
        />
      </div>
      <div style={styles.localEpidemicBox}>
        <div
          style={{
            ...styles.flexParent,
            justifyContent: "space-between",
            marginBottom: "24px",
            alignItems: "center",
          }}
        >
          <div style={{ ...styles.title, margin: 0 }}>所在州疫情</div>
          <div style={styles.areaName}>纽约州，美国</div>
        </div>
        <div style={styles.flexParent}>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>确诊病例</div>
            <div style={{ ...styles.illnessNum, color: "#EB5449" }}>11212</div>
          </div>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>昨日新增</div>
            <div style={{ ...styles.illnessNum, color: "#FDBB0F" }}>21151</div>
          </div>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>死亡人数</div>
            <div style={{ ...styles.illnessNum, color: "#333333" }}>2153</div>
          </div>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>治愈人数</div>
            <div style={{ ...styles.illnessNum, color: "#1EC5A0" }}>2153</div>
          </div>
        </div>
      </div>

      <div style={styles.policy}>
        <div style={styles.title}>院校政策</div>
        <div style={styles.flexParent}>
          <div style={styles.flexChild}>
            <div>院校运转</div>
            <div>{data.institute.course_operation_status ?? "-"}</div>
          </div>
          <div style={styles.flexChild}>
            <div>停课时间</div>
            <div>{data.institute.online_course_start_date ?? "-"}</div>
          </div>
          <div style={styles.flexChild}>
            <div>复课时间</div>
            <div style={styles.title}>-</div>
          </div>
        </div>
        <div>
          <ExternalLink
            link={
              "https://github.com/applysquare/covid19-datahub/issues/new/choose"
            }
          />
        </div>
      </div>
      <Help {...help} />

      <div style={{ background: "#FFFFFF", padding: "15px" }}>
        <div style={styles.dataAreaBox}>
          <div
            style={{ ...styles.title, fontSize: "18px", marginBottom: "10px" }}
          >
            本校资料区
          </div>
          <InfoList infoEdges={data.articles.edges} />
          <div style={{ textAlign: "center" }}>
            <Link style={styles.more} to="/article">
              展开全部
            </Link>
          </div>
        </div>
        <div>
          <div
            style={{
              ...styles.title,
              margin: "30px 0 22px 0",
            }}
          >
            资讯
          </div>
          <NewList newEdges={data.updates.edges} />
        </div>
      </div>
    </div>
  );
};

const Page = makePage(InstitutePageCore, {
  footer: false,
});
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
      nameCn
      nameEn
      website
      courseOperationstatus
      onlineCoursestartdate
      coursePolicylink
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
        fields: { templateKey: { eq: "article-page" } }
      }
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

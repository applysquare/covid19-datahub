import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../components/Layout";
// import { ExternalLink } from "../components/ExternalLink";
import NewList from "../components/NewList";
import InfoList from "../components/InfoList";
import Help from "../components/Help";
import GoBack from "../components/GoBack";
import {
  translateCourseOperationStatus,
  formatDate,
  domainURI,
  translateBingAreaId,
} from "../components/display";
import { help } from "../components/const";

const goBack = {
  title: "院校列表",
  customStyle: {
    color: "#FFFFFF",
    fontSize: "14px",
  },
};
// 之后换成网页端交流与资源建设页面入口

const InstitutePageCore = ({ data, errors }) => {
  if (errors) {
    console.error(errors);
  }
  const { area, institute = {}, articles, updates, covid19Area = {} } =
    data || {};
  const {
    cover,
    logo,
    nameCn,
    nameEn,
    onCampusCourseResumeDate,
    courseOperationStatus,
    onlineCourseStartDate,
    coursePolicyLink,
  } = institute;

  const {
    displayName,
    totalConfirmed,
    totalConfirmedDelta,
    totalDeaths,
    totalRecovered,
  } = covid19Area?.data || {};

  const infoEdges = articles?.edges || [];

  const translateAreaName = translateBingAreaId("cn", covid19Area?.data?.id);
  const subAreaName =
    translateAreaName !== covid19Area?.data?.id
      ? translateAreaName
      : displayName;

  return (
    <div className="institute-page">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${cover})`,
        }}
      >
        <div className="mask"></div>
        <div className="mask-content">
          <GoBack {...goBack} />
          <div className="flex-flex-start logo-wrapper">
            <span className="logo">
              <img src={logo} alt="" />
            </span>
            <span className="name-wrapper">
              <div className="name-cn all-page-omit">{nameCn}</div>
              <div className="name-en all-page-omit">{nameEn}</div>
            </span>
          </div>
        </div>
      </div>
      <div className="local-epidemic-wrapper">
        <div
          className="flex-space-betwwen"
          style={{
            marginBottom: "24px",
          }}
        >
          <div className="title">所在地区疫情</div>
          <div className="area-name">
            {subAreaName ? `${subAreaName}，` : ""}
            {area?.titleCn}
          </div>
        </div>
        <div className="flex-space-around">
          <div className="flex-item">
            <div className="illness-txt">确诊病例</div>
            <div style={{ color: "#EB5449" }}>{totalConfirmed || "-"}</div>
          </div>
          <div className="flex-item">
            <div className="illness-txt">昨日新增</div>
            <div style={{ color: "#FDBB0F" }}>{totalConfirmedDelta || "-"}</div>
          </div>
          <div className="flex-item">
            <div className="illness-txt">死亡人数</div>
            <div style={{ color: "#333333" }}>{totalDeaths || "-"}</div>
          </div>
          <div className="flex-item">
            <div className="illness-txt">治愈人数</div>
            <div style={{ color: "#1EC5A0" }}>{totalRecovered || "-"}</div>
          </div>
        </div>
      </div>

      <div className="policy-wrapper">
        <div className="title" style={{ marginBottom: "24px" }}>
          院校政策
        </div>
        <div className="flex-space-around">
          <div className="flex-item">
            <div>院校运转</div>
            <div className="status">
              {(courseOperationStatus &&
                translateCourseOperationStatus("cn", courseOperationStatus)) ??
                "-"}
            </div>
          </div>
          <div className="flex-item">
            <div>网课开始</div>
            <div className="status">
              {(onlineCourseStartDate && formatDate(onlineCourseStartDate)) ??
                "-"}
            </div>
          </div>
          <div className="flex-item">
            <div>复课时间</div>
            <div className="status">
              {(onCampusCourseResumeDate &&
                formatDate(onCampusCourseResumeDate)) ??
                "-"}
            </div>
          </div>
        </div>
        <div className="policy-web">
          <span>院校政策：</span>
          <a href={coursePolicyLink}>{domainURI(coursePolicyLink)}</a>
        </div>
      </div>
      <Help {...help} />

      <div className="info-new-box">
        <div className="info-wrapper">
          <div className="title info-title">本校资料区</div>
          <InfoList infoEdges={infoEdges} />
        </div>
        <div className="new-wrapper">
          <div className="title new-title">资讯</div>
          <NewList newEdges={updates?.edges} />
        </div>
      </div>
    </div>
  );
};

const Page = makePage(InstitutePageCore);
export default Page;

export const pageQuery = graphql`
  query InstitutePage(
    $id: String!
    $slug: String!
    $countryCode: String!
    $hasApiCode: Boolean!
    $apiCode: String
  ) {
    area(countryCode: { eq: $countryCode }) {
      id
      countryCode
      titleCn
    }
    covid19Area(data: { id: { eq: $apiCode } }) @include(if: $hasApiCode) {
      data {
        displayName
        id
        totalConfirmed
        totalConfirmedDelta
        totalDeaths
        totalDeathsDelta
        totalRecovered
      }
    }
    institute(id: { eq: $id }) {
      id
      logo
      nameCn
      nameEn
      website
      coursePolicyLink
      cover
      onCampusCourseResumeDate
      courseOperationStatus
      onlineCourseStartDate
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

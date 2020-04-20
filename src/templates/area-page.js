import React from "react";
import { graphql, Link } from "gatsby";
import { makePage } from "../components/Layout";
import Help from "../components/Help";
import InfoList from "../components/InfoList";
import NewList from "../components/NewList";
import GoBack from "../components/GoBack";
import { help } from "../components/const";

import {
  translateCourseOperationStatus,
  sliceArr,
} from "../components/display";

const goBack = {
  title: "全球动态",
  customStyle: {
    fontSize: "16px",
  },
};

// 之后换成网页端交流与资源建设页面入口

export const AreaPageCore = ({ data }) => {
  const { area, updates, articles, allInstitute } = data;
  const covid19Area = data?.covid19Area?.data;
  const infoEdges = articles?.edges || [];
  const institutes = sliceArr(allInstitute?.edges, 8);
  // const institutes = allInstitute?.edges;

  return (
    <div className="area-page">
      <div className="area-wrapper">
        <GoBack {...goBack} />
        <div>
          <div className="area">
            <span className="title title-cn">{area?.titleCn}</span>
            <span className="title-en">{area?.titleEn}</span>
          </div>

          <div className="flex-space-around">
            <div className="status-item">
              <div className="status-txt">确诊</div>
              <div className="total-confirmed">
                {covid19Area?.totalConfirmed || "-"}
              </div>
            </div>
            <div className="status-item">
              <div className="status-txt">新增</div>
              <div className="total-confirmed-delta">
                {covid19Area?.totalConfirmedDelta || "-"}
              </div>
            </div>
            <div className="status-item">
              <div className="status-txt">死亡</div>
              <div className="total-deaths">
                {covid19Area?.totalDeaths || "-"}
              </div>
            </div>
            <div className="status-item">
              <div className="status-txt">治愈</div>
              <div className="total-recovered">
                {covid19Area?.totalRecovered || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="institute-wrapper">
        <div className="flex-space-betwwen" style={{ marginBottom: "24px" }}>
          <div className="title">{area?.titleCn}院校实况</div>
          <Link className="more" to="/institute/us">
            更多
          </Link>
        </div>
        <div className="flex-flex-start">
          {(institutes || []).map((edge) => {
            return (
              <Link
                className="flex-item all-page-omit"
                key={edge?.node?.id}
                to={edge?.node?.fields?.pathname}
              >
                <div className="logo">
                  <img src={edge?.node?.logo} alt="" />
                </div>
                <div className="name all-page-omit">{edge?.node?.nameCn}</div>
                <div className="course-operation-status">
                  {translateCourseOperationStatus(
                    "cn",
                    edge?.node?.courseOperationStatus
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Help {...help} />

      <div className="info-new-box">
        <div className="info-wrapper">
          <div className="title info-title">{area?.titleCn}资料区</div>
          <InfoList infoEdges={infoEdges} />
        </div>
        <div className="new-wrapper">
          <div className="title new-title">{area?.titleCn}资讯</div>
          <NewList newEdges={updates?.edges} />
        </div>
      </div>
      <p />
    </div>
  );
};

const Page = makePage(AreaPageCore, {
  srcPath: "/src/templates/area-page.js",
});
export default Page;

export const pageQuery = graphql`
  query AreaPage(
    $id: String!
    $countryCode: String!
    $hasApiCode: Boolean!
    $apiCode: String
  ) {
    area(id: { eq: $id }) {
      id
      countryCode
      titleCn
      titleEn
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
    allInstitute(filter: { countryCode: { eq: $countryCode } }) {
      edges {
        node {
          courseOperationStatus
          id
          logo
          nameCn
          website
          fields {
            pathname
          }
        }
      }
    }
    updates: allMarkdownRemark(
      filter: {
        fields: { templateKey: { eq: "update-page" } }
        frontmatter: {
          countryCode: { eq: $countryCode }
        }
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
          }
        }
      }
    }
    articles: allMarkdownRemark(
      filter: {
        fields: { templateKey: { eq: "article-page" } }
        frontmatter: {
          countryCode: { eq: $countryCode }
          instituteSlug: {in: [null, ""]}
        }
      }
    ) {
      edges {
        node {
          html
          id
          fields {
            pathname
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

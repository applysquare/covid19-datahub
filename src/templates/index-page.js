import React from "react";
import UpdateRoll from "../components/UpdateRoll";
import { makePage } from "../components/Layout";
import { graphql, Link } from "gatsby";

export const IndexPageCore = ({ data, errors }) => {
  const config = data.pageIndexYml;
  const getApiData = (apiCode) => {
    return data.allCovid19Country.edges.find(edge => {
      return edge.node.data.CountryCode === apiCode;
    })?.node?.data;
  }

  return (
    <div>
      <div>
        <h1>全球院校追踪lalala</h1>
        <div>
          {config.highlightAreas.map(area => {
            const apiData = getApiData(area.apiCode);
            return (
              <div key={area.link}>
                <Link to={area.link} >
                  {area.name}
                </Link>
                <div>累计: {apiData?.TotalConfirmed}</div>
                <div>最新: {apiData?.NewConfirmed}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div>
          <Link to='/article'>

            资料区
          </Link>
          <div>政策汇总</div>
        </div>
        <a href="/">留学生问题征集</a>
      </div>
      <div>
        <h1>全球资讯</h1>
        <UpdateRoll />
      </div>
    </div>
  );
};

const Page = makePage(IndexPageCore);
export default Page;

export const pageQuery = graphql`
  query IndedxPage($apiCodes: [String]) {
    pageIndexYml {
      highlightAreas {
        name
        link
        apiCode
      }
    }
    allCovid19Country(filter: {data: {CountryCode: {in: $apiCodes}}}) {
      edges {
        node {
          data {
            Country
            CountryCode
            Slug
            NewConfirmed
            TotalConfirmed
          }
        }
      }
    }
    # covid19Summary(Countries: { elemMatch: { TotalConfirmed: { gt: 0 } } }) {
    #   Countries {
    #     Country
    #     NewConfirmed
    #     TotalConfirmed
    #     Slug
    #     NewDeaths
    #   }
    # }
  }
`;

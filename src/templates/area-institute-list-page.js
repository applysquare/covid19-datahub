import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { graphql, Link } from "gatsby";
import * as JsSearch from "js-search";
import { v4 } from "uuid";
import { makePage } from "../components/Layout";
import { translateCourseOperationStatus } from "../components/display";

// const filterArr = (arr = [], countryCode = "us") => {
//   return arr.filter((item) => {
//     return item.node.countryCode === countryCode;
//   });
// };

const PageCore = ({ data }) => {
  const { allInstitute = {}, allArea = {} } = data;
  const urlCountryCode =
    typeof window !== "undefined" &&
    window.location.pathname.match("[^/]+(?!.*/)")[0];

  const [institute, setInstitute] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    // const institute = filterArr(allInstitute?.edges, "us");
    const institute = allInstitute?.edges || [];
    setInstitute(institute);
    // const countryCode = window.location.pathname.match("[^/]+(?!.*/)")[0];
    setCountryCode(urlCountryCode);
    // 模糊搜索
    const search = new JsSearch.Search(["node", "id"]);
    search.tokenizer = {
      tokenize(text) {
        return text.split(/\s+/);
      },
    };
    search.addIndex(["node", "nameEn"]);
    search.addIndex(["node", "nameCn"]);
    search.addDocuments(institute);
    setSearch(search);
  }, [urlCountryCode, allInstitute]);

  // const filter = (countryCode = "", e) => {
  //   e.preventDefault();
  //   const institute = filterArr(allInstitute.edges, countryCode);
  //   setInstitute(institute);
  //   setCountryCode(countryCode);
  // };

  const onSearch = (e) => {
    const { value } = e.target;
    const searchResult =
      value !== "" ? search.search(value.trim()) : allInstitute?.edges || [];
    setInstitute(searchResult);
  };

  return (
    <div className="area-institute-list-page">
      <div className="flex-space-betwwen">
        <Link className="tab-item" to="/">
          全球动态
        </Link>
        <div className="triangle"></div>
        <Link
          className="tab-item"
          style={{ background: "#ffffff", color: "#1A6DFF" }}
        >
          院校数据
        </Link>
      </div>
      <div className="content">
        <div className="title">选择院校，了解院校安全发展动态</div>
        <div className="search-wrapper flex-space-betwwen">
          <input
            className="input-search"
            placeholder="输入院校全称或缩写"
            onInput={(e) => onSearch(e)}
          />
          <SearchOutlined />
        </div>
        <div className="flex-flex-start">
          {(allArea.edges || []).map((item, index) => {
            return (
              <Link
                className={`country ${
                  item?.node?.countryCode === countryCode
                    ? "active-country"
                    : null
                }`}
                key={v4()}
                href="###"
                to={`/institute/${item?.node?.countryCode}`}
                // onClick={(e) => filter(item?.node?.countryCode, e)}
              >
                {item?.node?.titleCn}
              </Link>
            );
          })}
        </div>
        <div className="flex-space-betwwen state-text">
          <div>大学</div>
          <div>状态</div>
        </div>
        <div className="search-result-wrapper">
          <div>
            {(institute || []).map((edge) => {
              const { node } = edge;
              return (
                <Link
                  className="flex-space-betwwen item-result"
                  to={node?.fields?.pathname}
                  key={node?.fields?.pathname}
                >
                  <div style={{ maxWidth: "80%" }}>
                    <div className="name-cn all-page-omit">{node?.nameCn}</div>
                    <div className="name-en all-page-omit">{node?.nameEn}</div>
                  </div>
                  {/* <div
                  style={{
                    ...styles.flexParent,
                    alignItems: "center",
                    fontSize: "14px"
                  }}
                > */}
                  <span className="state">
                    {translateCourseOperationStatus(
                      "cn",
                      node?.courseOperationStatus
                    )}
                  </span>
                  {/* <RightOutlined /> */}
                  {/* </div> */}
                </Link>
              );
            })}
          </div>
          <div
            className={`no-data-wrapper ${
              institute === null || (institute && institute.length)
                ? null
                : "active-no-data"
            }`}
          >
            <div className="no-data">
              暂时没有院校结果，你可以尝试搜索周边的院校，获得资源与新闻
            </div>
            <div className="no-data" style={{ margin: "60px 0 30px 0" }}>
              希望加入你的学校？你可以自己建设它
            </div>
            <div className="no-data">
              <a href="https://github.com/applysquare/covid19-datahub/issues/new?assignees=&labels=%E6%96%B0%E5%A2%9E%E9%99%A2%E6%A0%A1&template=cn-xin-add-university-cn.md&title=%5B%E6%96%B0%E5%A2%9E%E9%99%A2%E6%A0%A1%5D+">
                新增院校
              </a>
            </div>
          </div>
        </div>
      </div>
      <p />
    </div>
  );
};

// const Page = makePage(PageCore);
const Page = makePage(PageCore, {
  srcPath: "/src/templates/area-page.js",
});
export default Page;

export const pageQuery = graphql`
  query AreaInstituteListPage($countryCode: String!) {
    allArea(sort: { order: ASC, fields: ranking }) {
      edges {
        node {
          countryCode
          titleCn
        }
      }
    }
    allInstitute(filter: { countryCode: { eq: $countryCode } }) {
      edges {
        node {
          countryCode
          courseOperationStatus
          id
          nameCn
          nameEn
          fields {
            pathname
          }
        }
      }
    }
  }
`;

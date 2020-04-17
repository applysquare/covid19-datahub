import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { graphql, Link } from "gatsby";
import * as JsSearch from "js-search";
import { v4 } from "uuid";
import { makePage } from "../components/Layout";
import { translateCourseOperationStatus } from "../components/display";

const styles = {
  flexParent: {
    display: "flex",
    flexWrap: "wrap",
  },
  tabItem: {
    padding: "8px 0",
    textAlign: "center",
    pointer: "cursor",
    flex: 1,
    background: "#F1F1F1",
    textDecoration: "none",
    color: "#333333",
  },
  triangle: {
    width: 0,
    height: 0,
    display: "inline-block",
    background: "transparent",
    borderBottom: "0px solid transparent",
    borderTop: "40px solid rgb(241, 241, 241)",
    borderLeft: "6px solid rgb(241, 241, 241)",
    borderRight: "10px solid transparent",
  },
  title: {
    fontSize: "20px",
    margin: "30px 0 24px 0",
  },
  link: {
    textDecoration: "none",
    color: "#333333",
  },
  nameCn: {
    fontSize: "16px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  stateCn: {
    paddingRight: "6px",
  },
  countryCn: {
    background: "#FFFFFF",
    borderRadius: "4px",
    border: "1px solid rgba(228,228,228,1)",
    padding: "6px 16px",
    fontSize: "14px",
    color: "#999999",
    marginTop: "16px",
    textDecoration: "none",
  },
  inputBox: {
    display: "flex",
    // display: "-webkit-flex",
    // display: "-ms-flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 11px",
    color: "rgba(0,0,0,.65)",
    fontSize: "14px",
    backgroundColor: "#fff",
    backgroundImage: "none",
    boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.08)",
    borderRadius: "4px",
    border: "1px solid rgba(242,242,242,1)",
    transition: "all .3s",
  },
  inputTxt: {
    width: "100%",
    outline: "none",
    border: "none",
    fontSize: "14px",
  },
  noData: {
    textAlign: "center",
    fontSize: "14px",
    // margin: "40px 0",
  },
};

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

  const [institute, setInstitute] = useState([]);
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
    <div style={{ background: "#ffffff" }}>
      <div style={styles.flexParent}>
        <Link style={styles.tabItem} to="/">
          全球动态
        </Link>
        <div style={styles.triangle}></div>
        <Link
          style={{ ...styles.tabItem, background: "#ffffff", color: "#1A6DFF" }}
        >
          院校数据
        </Link>
      </div>
      <div style={{ padding: "15px" }}>
        <div style={styles.title}>选择院校，了解院校安全发展动态</div>
        <div style={styles.inputBox}>
          <input
            placeholder="输入院校全称或缩写"
            style={styles.inputTxt}
            onInput={(e) => onSearch(e)}
          />
          <SearchOutlined />
        </div>
        <div style={styles.flexParent}>
          {(allArea.edges || []).map((item, index) => {
            return (
              <Link
                key={v4()}
                href="###"
                style={{
                  ...styles.countryCn,
                  marginLeft: index === 0 ? "0px" : "8px",
                  background:
                    item.node.countryCode === countryCode
                      ? "#1A6DFF"
                      : "#ffffff",
                  color:
                    item?.node?.countryCode === countryCode
                      ? "#ffffff"
                      : "rgb(153, 153, 153)",
                }}
                to={`/institute/${item?.node?.countryCode}`}
                // onClick={(e) => filter(item?.node?.countryCode, e)}
              >
                {item?.node?.titleCn}
              </Link>
            );
          })}
        </div>
        <div
          style={{
            ...styles.flexParent,
            justifyContent: "space-between",
            padding: "0 15px",
            fontSize: "14px",
            marginTop: "16px",
          }}
        >
          <div>大学</div>
          <div>状态</div>
        </div>
        <div
          style={{
            minHeight: "400px",
            display: institute.length ? "block" : "none",
          }}
        >
          {institute.map((edge) => {
            const { node } = edge;
            return (
              <Link
                style={styles.link}
                to={node?.fields?.pathname}
                key={node?.fields?.pathname}
              >
                <div
                  style={{
                    ...styles.flexParent,
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 10px",
                    borderBottom: "1px solid #E4E4E4",
                  }}
                  key={node?.id}
                >
                  <div style={{ maxWidth: "80%" }}>
                    <div style={styles.nameCn}>{node?.nameCn}</div>
                    <div style={{ ...styles.nameCn, fontSize: "12px" }}>
                      {node?.nameEn}
                    </div>
                  </div>
                  {/* <div
                  style={{
                    ...styles.flexParent,
                    alignItems: "center",
                    fontSize: "14px"
                  }}
                > */}
                  <span style={styles.stateCn}>
                    {translateCourseOperationStatus(
                      "cn",
                      node?.courseOperationStatus
                    )}
                  </span>
                  {/* <RightOutlined /> */}
                  {/* </div> */}
                </div>
              </Link>
            );
          })}
        </div>
        <div
          style={{
            margin: "70px 0",
            display: institute.length ? "none" : "block",
          }}
        >
          <div style={styles.noData}>
            暂时没有院校结果，你可以尝试搜索周边的院校，获得资源与新闻
          </div>
          <div style={{ ...styles.noData, margin: "60px 0 30px 0" }}>
            希望加入你的学校？你可以自己建设它
          </div>
          <div style={styles.noData}>
            <a
              href="https://github.com/applysquare/covid19-datahub/issues/new?assignees=&labels=%E6%96%B0%E5%A2%9E%E9%99%A2%E6%A0%A1&template=cn-xin-add-university-cn.md&title=%5B%E6%96%B0%E5%A2%9E%E9%99%A2%E6%A0%A1%5D+"
              style={{ color: "rgba(26,109,255,1)" }}
            >
              新增院校
            </a>
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

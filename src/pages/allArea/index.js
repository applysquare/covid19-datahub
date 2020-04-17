import React from "react";
import { Link } from "gatsby";
import { v4 } from "uuid";
import { LeftOutlined } from "@ant-design/icons";
import { makePage } from "../../components/Layout";

const styles = {
  box: {
    padding: "20px 15px",
  },
  logoTitle: {
    fontSize: "14px",
    color: "#FFFFFF",
    padding: "15px 0 15px 2px",
  },
  linkBack: {
    textDecoration: "none",
    color: "#333333",
  },
  title: {
    fontSize: "20px",
    margin: "15px 0",
  },
  flexParent: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  tableTitle: {
    background: "#1A6DFF",
    color: "#FFFFFF",
    fontSize: "14px",
  },
  flexChild: {
    padding: "15px 12px",
    boxSizing: "border-box",
  },
  titleCn: {
    fontSize: "12px",
    color: "rgba(26,109,255,1)",
  },
  num: {
    color: "#333333",
    fontSize: "12px",
  },
};
const tableTitleList = [
  { txt: "国家", width: "23%" },
  { txt: "确诊", width: "20%" },
  { txt: "新增", width: "20%" },
  { txt: "死亡", width: "17%" },
  { txt: "治愈", width: "20%" },
];
const arr = [
  {
    titleCn: "美国",
    numStateCases: 325421,
    numStateDailyNewCases: 78452,
    numStateDeaths: 15230,
    numStateCures: 25123,
  },
  {
    titleCn: "澳大利亚",
    numStateCases: 325421,
    numStateDailyNewCases: 78452,
    numStateDeaths: 15230,
    numStateCures: 25123,
  },
  {
    titleCn: "美国",
    numStateCases: 325421,
    numStateDailyNewCases: 78452,
    numStateDeaths: 15230,
    numStateCures: 25123,
  },
  {
    titleCn: "澳大利亚",
    numStateCases: 325421,
    numStateDailyNewCases: 78452,
    numStateDeaths: 15230,
    numStateCures: 25123,
  },
];

const PageCore = ({ data }) => {
  return (
    <div style={styles.box}>
      <div style={styles.logoTitle}>
        <Link style={styles.linkBack} to="/">
          <LeftOutlined />
          <span style={{ padding: "0 4px" }}>全球动态</span>
        </Link>
      </div>
      <div style={styles.title}>了解各国动态</div>
      <div style={{ ...styles.flexParent, ...styles.tableTitle }}>
        {tableTitleList.map((item) => {
          return (
            <div style={{ ...styles.flexChild, width: item.width }} key={v4()}>
              {item.txt}
            </div>
          );
        })}
      </div>
      {arr.map((item, index) => {
        const {
          titleCn,
          numStateCases,
          numStateDailyNewCases,
          numStateDeaths,
          numStateCures,
        } = item;
        return (
          <Link
            key={v4()}
            style={{
              ...styles.flexParent,
              textDecoration: "none",
              background: index % 2 === 0 ? "rgba(26,109,255,0.1)" : "#FFFFFF",
            }}
            to="/area/au/"
          >
            <div
              style={{ ...styles.flexChild, ...styles.titleCn, width: "23%" }}
            >
              {titleCn}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "20%" }}>
              {numStateCases}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "20%" }}>
              {numStateDailyNewCases}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "17%" }}>
              {numStateDeaths}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "20%" }}>
              {numStateCures}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Page = makePage(PageCore);
export default Page;

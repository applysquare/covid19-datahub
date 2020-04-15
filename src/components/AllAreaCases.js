import React from "react";
import { Link } from "gatsby";
import { v4 } from "uuid";

const styles = {
  box: {
    marginTop: "30px",
    transition: "opacity 2s",
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
  { txt: "国家地区", width: "23%" },
  { txt: "确诊", width: "20%" },
  { txt: "新增", width: "20%" },
  { txt: "死亡", width: "17%" },
  { txt: "治愈", width: "20%" },
];

const AllAreaCases = ({ data = [] }) => {
  return (
    <div style={styles.box}>
      <div style={{ ...styles.flexParent, ...styles.tableTitle }}>
        {tableTitleList.map((item) => {
          return (
            <div
              style={{ ...styles.flexChild, width: `${item.width}` }}
              key={v4()}
            >
              {item.txt}
            </div>
          );
        })}
      </div>
      {data.map((item, index) => {
        return (
          <Link
            key={v4()}
            style={{
              ...styles.flexParent,
              textDecoration: "none",
              background: `${
                index % 2 === 0 ? "rgba(26,109,255,0.1)" : "#FFFFFF"
              }`,
            }}
            to="/area/au/"
          >
            <div
              style={{ ...styles.flexChild, ...styles.titleCn, width: "23%" }}
            >
              {item?.node?.data?.displayName || "-"}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "20%" }}>
              {item?.node?.data?.totalConfirmed || "-"}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "20%" }}>
              {item?.node?.data?.totalConfirmedDelta || "-"}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "17%" }}>
              {item?.node?.data?.totalDeaths || "-"}
            </div>
            <div style={{ ...styles.flexChild, ...styles.num, width: "20%" }}>
              {item?.node?.data?.totalRecovered || "-"}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AllAreaCases;

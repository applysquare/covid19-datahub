import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#333333",
    padding: "7px 0"
  },
  link: {
    textDecoration: "none"
  },
  txt: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginRight: "10px"
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    padding: "5px",
    display: "inline-block",
    textDecoration: "underline"
  }
};

const sliceArr = (arr = [], num = 0) => {
  return arr.length > num ? arr.slice(0, num) : arr;
};

const InfoList = ({ infoEdges = [] }) => {
  const [infoArr, setInfoArr] = useState([]);
  const [more, setMore] = useState(null);
  useEffect(() => {
    const infoArr = sliceArr(infoEdges, 3);
    setInfoArr(infoArr);
    setMore(false);
  }, [infoEdges]);

  const clickMore = () => {
    setInfoArr(infoEdges);
    setMore(true);
  };

  return (
    <div>
      <div>
        {infoArr &&
          infoArr.map(edge => {
            const art = edge?.node?.frontmatter;
            return (
              <Link
                style={styles.link}
                key={edge?.node?.id}
                to={edge?.node?.fields?.pathname}
              >
                <div style={styles.item}>
                  <div style={styles.txt}>{art?.title}</div>
                  <RightOutlined />
                </div>
              </Link>
            );
          })}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            ...styles.more,
            display: `${more ? "none" : "inline-block"}`
          }}
          onClick={clickMore}
        >
          展开全部
        </button>
      </div>
    </div>
  );
};

export default InfoList;

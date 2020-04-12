// import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";
import { sliceArr } from "../components/display";

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
    display: "block",
    width: "100%"
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
  const clickToDetail = (html, pathname) => {
    // if (html) {
    window.location.href = pathname;
    // }
  };
  return (
    <div>
      <div>
        {infoArr &&
          infoArr.map(edge => {
            const art = edge?.node?.frontmatter;
            const html = edge?.node?.html;
            const pathname = edge?.node?.fields?.pathname;
            return (
              <button
                style={styles.link}
                key={edge?.node?.id}
                // to={edge?.node?.fields?.pathname}
                onClick={() => {
                  clickToDetail(html, pathname);
                }}
              >
                <div style={styles.item}>
                  <div style={styles.txt}>{art?.title}</div>
                  <RightOutlined />
                </div>
              </button>
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

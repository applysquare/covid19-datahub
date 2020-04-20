// import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "gatsby";
import { sliceArr } from "../components/display";

const styles = {
  item: {
    fontSize: "14px",
    color: "#333333",
    padding: "7px 0",
  },
  link: {
    display: "block",
    width: "100%",
    textDecoration: "none",
  },
  txt: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginRight: "10px",
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    padding: "5px",
    display: "inline-block",
  },
};

const InfoList = ({ infoEdges = [] }) => {
  const [infoArr, setInfoArr] = useState([]);
  const [more, setMore] = useState(null);

  useEffect(() => {
    setInfoArr(sliceArr(infoEdges, 3));
    setMore(false);
  }, [infoEdges]);

  const clickBtn = (e) => {
    e.preventDefault();
    const arr = more ? sliceArr(infoEdges, 3) : infoEdges;
    setInfoArr(arr);
    setMore(!more);
  };
  return (
    <div>
      <div>
        {infoArr &&
          infoArr.map((edge) => {
            const art = edge?.node?.frontmatter;
            return (
              <Link
                style={styles.link}
                key={edge?.node?.id}
                to={edge?.node?.fields?.pathname}
              >
                <div className="flex-space-betwwen" style={styles.item}>
                  <div style={styles.txt}>{art?.title}</div>
                  <RightOutlined />
                </div>
              </Link>
            );
          })}
      </div>
      <div style={{ textAlign: "center" }}>
        <a
          href="###"
          style={styles.more}
          onClick={(e) => {
            clickBtn(e);
          }}
        >
          {more ? "收起" : "展开全部"}
        </a>
      </div>
    </div>
  );
};

export default InfoList;

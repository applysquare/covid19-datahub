import { Link } from "gatsby";
import React from "react";
import { RightOutlined } from "@ant-design/icons";

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#333333",
    padding: "7px 0",
  },
  link: {
    textDecoration: "none",
  },
};

const InfoList = ({ infoEdges }) => {
  return (
    <div>
      {infoEdges &&
        infoEdges.map((edge) => {
          const art = edge?.node?.frontmatter;
          return (
            <Link
              style={styles.link}
              key={edge?.node?.id}
              to={edge?.node?.fields?.pathname}
            >
              <div style={styles.item}>
                <div>{art?.title}</div>
                <RightOutlined />
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default InfoList;

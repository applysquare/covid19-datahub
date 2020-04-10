import { Link } from "gatsby";
import React from "react";
import { v4 } from "uuid";

const styles = {
  item: { padding: "10px 0" },
  title: {
    fontWeight: "500",
    fontSize: "18px",
    color: "#333333",
    marginBottom: "5px",
    fontFamily: "helvitica"
  },
  time: {
    fontSize: "12px",
    color: "#999999"
  },
  link: {
    textDecoration: "none"
  }
};
const NewList = ({ newEdges }) => {
  return (
    <div>
      {newEdges.map(edge => {
        const art = edge?.node?.frontmatter;
        return (
          <div style={styles.item} key={v4()}>
            <Link
              style={styles.link}
              key={edge?.node?.id}
              to={edge?.node?.fields?.pathname}
            >
              <div style={styles.title}>{art?.title}</div>
              <div style={styles.time}>2020.04.01</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NewList;

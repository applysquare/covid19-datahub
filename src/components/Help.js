import React from "react";
import { Link } from "gatsby";

const styles = {
  helpBox: {
    margin: "15px",
    borderRadius: "4px",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    background:
      "linear-gradient(90deg,rgba(88,107,154,1) 0%,rgba(134,152,198,1) 100%)",
    padding: "20px 10px",
    display: "block",
    textDecoration: "none",
  },
  helpTitle: { fontSize: "18px", color: "#FFFFFF", marginBottom: "5px" },
  helpItem: { color: "#FFFFFF", fontSize: "12px" },
};

const Help = ({ title, linkTxt, linkTo }) => {
  return (
    <Link style={styles.helpBox} to={linkTo}>
      <div style={styles.helpTitle}>{title}</div>
      <div style={styles.helpItem}>{linkTxt}</div>
    </Link>
  );
};

export default Help;

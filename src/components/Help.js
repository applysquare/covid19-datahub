import React from "react";
import { Link } from "gatsby";
import helpBg from "../img/helpBg.png";

const styles = {
  helpBox: {
    margin: "15px",
    borderRadius: "4px",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    background: "linear-gradient(90deg,#137ECA 0%,#02B6DF 100%)",
    padding: "20px 10px",
    display: "block",
    textDecoration: "none",
    position: "relative",
    // backgroundImage: `url(${helpBg})`,
  },
  bgBox: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
  },
  img: {
    height: "100%",
  },
  helpTitle: { fontSize: "18px", color: "#FFFFFF", marginBottom: "5px" },
  helpItem: { color: "#FFFFFF", fontSize: "12px" },
};

const Help = ({ title, linkTxt, linkTo }) => {
  return (
    <Link style={styles.helpBox} to={linkTo}>
      <div style={{ width: "50%" }}>
        <div style={styles.helpTitle}>{title}</div>
        <div style={styles.helpItem}>{linkTxt}</div>
      </div>
      <div style={styles.bgBox}>
        <img style={styles.img} src={helpBg} alt="" />
      </div>
    </Link>
  );
};

export default Help;

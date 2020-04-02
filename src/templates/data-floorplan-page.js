import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../components/Layout";

export const ArticlePageCore = () => {
  return (
    <div>
      <p>
        floorplan
      </p>
    </div>
  );
};

const Page = makePage(ArticlePageCore);
export default Page;
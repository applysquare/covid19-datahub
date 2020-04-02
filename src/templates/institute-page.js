import React from "react";
import { graphql } from "gatsby";
import { makePage } from "../components/Layout";

const InstitutePageCore = ({ data, errors }) => {
  if (errors) {
    console.error(errors);
  }
  return (
    <div>
      <h1>{data.institute.name_cn}</h1>
      <div>Website: {data.institute.website}</div>
    </div>
  );
};

const Page = makePage(InstitutePageCore);
export default Page;

export const pageQuery = graphql`
  query InstitutePage($id: String!, $slug: String, $countryCode: String) {
    area(countryCode: { eq: $countryCode }) {
      id
      countryCode
      title
    }
    institute(id: { eq: $id }) {
      id
      name_cn
      name_en
      website
      fields {
        pathname
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          instituteSlug: { eq: $slug }
          templateKey: { eq: "update-page" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            pathname
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

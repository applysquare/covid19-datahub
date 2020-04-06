import React from "react";
import { makePage } from "../../components/Layout";
import { Link } from 'gatsby';

const PageCore = ({ data }) => {
  return <div>
    <h1>全部学校</h1>
    {
      data.allInstitute.edges.map(edge => {
        const { node } = edge;
        return <div key={node.id} style={
          { marginBottom: 20 }
        }>
          <div>
            <Link to={node.fields.pathname}>{node.name_cn}</Link>
          </div>
          <div>{node.name_en}</div>
          <div>{node.state_cn}</div>
        </div>
      })
    }
  </div >;
};

const Page = makePage(PageCore);

export default Page;


export const pageQuery = graphql`
  query InstituteListPage {
    allInstitute(sort: {fields: [countryCode, name_en]}) {
      edges {
        node {
          id
          name_cn
          name_en
          fields {
            pathname
          }
        }
      }
    }
  }
`;

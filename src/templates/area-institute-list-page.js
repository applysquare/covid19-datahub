import React from 'react';
import { makePage } from "../components/Layout";

export const AreaPageCore = ({ data }) => {
  console.log(data);
  return <div>hi</div>;
  // const { area, allInstitute, updates, articles } = data;
  // return (
  //   <div>
  //     <div>
  //       <Link to="/">返回首页</Link>
  //     </div>
  //     <h1>{area.title}</h1>
  //     <h2>学校</h2>
  //     {allInstitute.edges.map((edge) => {
  //       return (
  //         <div key={edge.node.id}>
  //           <Link to={edge.node.fields.pathname}>{edge.node.name_cn}</Link>
  //         </div>
  //       );
  //     })}
  //   </div>
};

const Page = makePage(AreaPageCore, {
  srcPath: "/src/templates/area-page.js",
});
export default Page;

export const pageQuery = graphql`
  query AreaInstituteListPage($id: String!, $countryCode: String!) {
    area(id: { eq: $id }) {
      id
      countryCode
      title
    }
    allArea {
      edges {
        node {
          countryCode
          title
        }
      }
    }
    allInstitute(filter: { countryCode: { eq: $countryCode } }) {
      edges {
        node {
          id
          nameCn
          website
          fields {
            pathname
          }
        }
      }
    }
  }
`;

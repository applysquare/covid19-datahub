const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              pathname
              templateKey
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(edge => {
    const id = edge.node.id;
    const pathname = edge.node.fields.pathname;
    const templateKey = edge.node.fields.templateKey;
    createPage({
      path: pathname,
      tags: edge.node.frontmatter.tags,
      component: path.resolve(`src/templates/${templateKey}.js`),
      // additional data can be passed via context
      context: {
        id
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode, reporter }) => {
  const { createNodeField, createPage } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images
  if (node.internal.owner === `gatsby-transformer-yaml`) {
    const templateKey =
      node.templateKey || `${_.kebabCase(node.internal.type)}-page`;

    const pathname = createFilePath({ node, getNode });

    const contextFn = path.resolve(`src/templates/${templateKey}-context.js`);
    let context = {};
    if (fs.existsSync(contextFn)) {
      const makeContext = require(contextFn);
      context = makeContext(node);
    }

    createPage({
      path: pathname,
      // tags: edge.node.frontmatter.tags,
      component: path.resolve(`src/templates/${templateKey}.js`),
      // additional data can be passed via context
      context: Object.assign(
        {
          id: node.id
          // countryCode: node.countryCode,
          // instituteSlug: node.instituteSlug,
          // slug: node.slug
        },
        context
      )
    });

    if (templateKey === "area-page") {
      createPage({
        path: `/institute/${node.countryCode}`,
        // tags: edge.node.frontmatter.tags,
        component: path.resolve(`src/templates/area-institute-list-page.js`),
        // additional data can be passed via context
        context: Object.assign(
          {
            id: node.id,
            countryCode: node.countryCode
            // instituteSlug: node.instituteSlug,
            // slug: node.slug
          },
          context
        )
      });
    }

    createNodeField({
      node: node,
      name: `pathname`,
      value: pathname
    });
  }
  if (node.internal.type === `MarkdownRemark`) {
    const pathname = createFilePath({ node, getNode });
    createNodeField({
      name: `pathname`,
      node: node,
      value: pathname
    });
    const templateKey =
      node.frontmatter.templateKey ||
      `${_.kebabCase(pathname.split("/")[1])}-page`;
    if (templateKey === "article-page" || templateKey === "update-page") {
      const fn = path.relative(__dirname, node.fileAbsolutePath);
      if (!node.frontmatter.date) {
        // throw new Error(`Data error: the 'date' field is not set for file: ${fn}`);
        reporter.panicOnBuild(
          `Data error: the 'date' field is not set for file: ${fn}`
        );
      }
      if (isNaN(Date.parse(node.frontmatter.date))) {
        //throw new Error(`Data error: invalid 'date' value (${node.frontmatter.date}) in file: ${fn}`);
        reporter.panicOnBuild(
          `Data error: invalid 'date' value (${node.frontmatter.date}), it must be YYYY-MM-DD in file: ${fn}`
        );
      }
    }
    createNodeField({
      name: `templateKey`,
      node: node,
      value: templateKey
    });
  }

  // node =
  // { title: '美国',
  //   countryCode: 'us',
  //   id: '2c450cb2-67dd-5f89-8348-3a943cdeba10',
  //   children: [],
  //   parent: 'c2e6d4cf-ddc5-5658-91a7-ecb4dd720424',
  //   internal:
  //    { contentDigest: 'a8e9402d4e2950675a8047cbc7317a29',
  //      type: 'Yaml',
  //      counter: 117,
  //      owner: 'gatsby-transformer-yaml' } }
};

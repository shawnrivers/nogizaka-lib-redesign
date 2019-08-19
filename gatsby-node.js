/* eslint-disable */
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);
const locales = require(`./src/i18n/locales`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "AlbumsJson") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug + node.number,
    });
  }

  if (node.internal.type === "SinglesJson") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug + node.number,
    });
  }

  if (node.internal.type === "SongsJson") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug + node.key,
    });
  }

  if (node.internal.type === "MembersJson") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug + node.name,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const albumsResult = await graphql(`
    {
      allAlbumsJson {
        edges {
          node {
            fields {
              slug
            }
            number
          }
        }
      }
    }
  `);

  const singlesResult = await graphql(`
    {
      allSinglesJson {
        edges {
          node {
            fields {
              slug
            }
            number
          }
        }
      }
    }
  `);

  const songsResult = await graphql(`
    {
      allSongsJson {
        edges {
          node {
            fields {
              slug
            }
            key
          }
        }
      }
    }
  `);

  const membersResult = await graphql(`
    {
      allMembersJson {
        edges {
          node {
            fields {
              slug
            }
            name
          }
        }
      }
    }
  `);

  if (
    albumsResult.errors ||
    singlesResult.errors ||
    songsResult.errors ||
    membersResult.errors
  ) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const localesKeys = Object.keys(locales);

  albumsResult.data.allAlbumsJson.edges.forEach(({ node }) => {
    const cdType = node.fields.slug.split("/")[1];
    const number = node.number;

    for (const lang of localesKeys) {
      const localizedPath = locales[lang].default
        ? node.fields.slug
        : locales[lang].path + node.fields.slug;

      createPage({
        path: localizedPath,
        component: path.resolve("./src/components/templates/Album/index.tsx"),
        context: {
          number,
          cdType,
          locale: lang,
        },
      });
    }
  });

  singlesResult.data.allSinglesJson.edges.forEach(({ node }) => {
    const cdType = node.fields.slug.split("/")[1];
    const number = node.number;

    for (const lang of localesKeys) {
      const localizedPath = locales[lang].default
        ? node.fields.slug
        : locales[lang].path + node.fields.slug;

      createPage({
        path: localizedPath,
        component: path.resolve("./src/components/templates/Single/index.tsx"),
        context: {
          number,
          cdType,
          locale: lang,
        },
      });
    }
  });

  songsResult.data.allSongsJson.edges.forEach(({ node }) => {
    for (const lang of localesKeys) {
      const localizedPath = locales[lang].default
        ? node.fields.slug
        : locales[lang].path + node.fields.slug;

      createPage({
        path: localizedPath,
        component: path.resolve("./src/components/templates/Song/index.tsx"),
        context: {
          key: node.key,
          locale: lang,
        },
      });
    }
  });

  membersResult.data.allMembersJson.edges.forEach(({ node }) => {
    for (const lang of localesKeys) {
      const localizedPath = locales[lang].default
        ? node.fields.slug
        : locales[lang].path + node.fields.slug;

      createPage({
        path: localizedPath,
        component: path.resolve("./src/components/templates/Member/index.tsx"),
        context: {
          name: node.name,
          locale: lang,
        },
      });
    }
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path;

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
        },
      });
    });

    resolve();
  });
};

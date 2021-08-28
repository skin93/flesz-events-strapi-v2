const flattenObject = require("../../../config/functions/flattenObject");

module.exports = {
  query: `
  articlesCountBasedOnTagOrCategory(where: JSON): Int!
  `,
  resolver: {
    Query: {
      articlesCountBasedOnTagOrCategory: {
        description: "Return the count of articles based on tag/category slug",
        resolverOf: "application::article.article.count",
        resolver: async (obj, options, ctx) => {
          if (options.where === undefined) {
            options.where = {};
          }
          options.where = flattenObject(options.where);
          return await strapi.api.article.services.article.count(options.where);
        },
      },
    },
  },
};

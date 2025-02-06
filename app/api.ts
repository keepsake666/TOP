export const API = {
  topPage: {
    find:
      process.env.NEXT_PUBLIC_DOMAIN ||
      "https://courses-top.ru" + "/api/top-page/find",
    byAlias:
      process.env.NEXT_PUBLIC_DOMAIN ||
      "https://courses-top.ru" + "/api/top-page/byAlias/",
  },
  product: {
    find:
      process.env.NEXT_PUBLIC_DOMAIN ||
      "https://courses-top.ru" + "/api/product/find",
  },
  review: {
    createDemo:
      process.env.NEXT_PUBLIC_DOMAIN ||
      "https://courses-top.ru" + "/api/review/create-demo",
  },
};

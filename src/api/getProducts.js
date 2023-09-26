import { sanityClient } from "../helpers/client";

export default async function getProducts() {
  const productQuery = '*[_type == "product"]';
  const products = await sanityClient.fetch(productQuery);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await sanityClient.fetch(bannerQuery);
  return [products, bannerData];
}

//Ceea ce se solicita mai sus (ie. product/banner) este ceea ce noi am pus in folderul schemas din Sanity.

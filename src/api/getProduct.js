import { sanityClient } from "../helpers/client";

export default async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await sanityClient.fetch(query);
  const products = await sanityClient.fetch(productsQuery);

  return [products, product];
}

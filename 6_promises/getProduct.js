const getProduct = (id) => fetch(`https://fakestoreapi.com/products/${id}`);
module.exports = {
  getProduct,
};

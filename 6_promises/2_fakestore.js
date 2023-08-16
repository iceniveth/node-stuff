// docker run -it --rm -v $(pwd):/app -w /app node fakestore.js

const { getProduct } = require("./getProduct");

// fetch("https://fakestoreapi.com/products/1")
//   .then((res) => res.json())
//   .then((res) => console.log(res));

// async await

// (async () => {
//   const res = await fetch("https://fakestoreapi.com/products/1");
//   const product = await res.json();
//   console.log(product);
// })();

// concurrently fetched (order not guaranteed)

// console.log("getProduct1");
// getProduct(1)
//   .then((res) => res.json())
//   .then((res) => console.log(res));

// console.log("getProduct2");
// getProduct(2)
//   .then((res) => res.json())
//   .then((res) => console.log(res));

// console.log("getProduct3");
// getProduct(3)
//   .then((res) => res.json())
//   .then((res) => console.log(res));

// concurrently fetch using async await

// (async () => {
//   const getProductPromises = await Promise.all([
//     getProduct(1),
//     getProduct(2),
//     getProduct(3),
//   ]);
//   const productPromises = await Promise.all(
//     getProductPromises.map((res) => res.json())
//   );
//   console.log(productPromises);
// })();

// if we won't promise.all()

// (async () => {
//   const res1 = await getProduct(1);
//   const product1 = await res1.json();
//   console.log(product1);
//   const res2 = await getProduct(2);
//   const product2 = await res2.json();
//   console.log(product2);
//   const res3 = await getProduct(3);
//   const product3 = await res3.json();
//   console.log(product3);
// })();

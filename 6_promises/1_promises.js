const somePromise = new Promise((resolve, reject) => {
  const rate = Math.random() * 100;

  if (rate >= 50) {
    resolve({ rate });
  } else {
    reject({ rate });
  }
});

somePromise
  .then((result) => {
    console.log(`success: ${JSON.stringify(result)}`);
  })
  .catch((error) => {
    console.log(`failed: ${JSON.stringify(error)}`);
  });

// async function main2() {
//   try {
//     const result = await somePromise;
//     console.log(`success: ${JSON.stringify(result)}`);
//   } catch (error) {
//     console.log(`failed: ${JSON.stringify(error)} `);
//   }
// }
// main2();

// async function main3() {
//   const result = await somePromise.catch((error) => {
//     console.log(`failed: ${JSON.stringify(error)}`);
//   });
//   console.log(`success: ${JSON.stringify(result)}`);
// }
// main3();

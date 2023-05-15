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

// (async function () {
//   try {
//     const result = await somePromise;
//     console.log(`success: ${JSON.stringify(result)}`);
//   } catch (error) {
//     console.log(`failed: ${JSON.stringify(error)} `);
//   }
// })();

// (async function () {
//   const result = await somePromise.catch((error) => {
//     console.log(`failed: ${JSON.stringify(error)}`);
//   });
//   console.log(`success: ${JSON.stringify(result)}`);
// })();

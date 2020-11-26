const p = new Promise((resolve, reject) => {

  // Kick off some async work
  // ...
  setTimeout(() => {
    // resolve(1); // 用resolve把里面的值送给consumer
    reject(new Error('message'));
  }, 2000);

  // reject(new Error('message'));

});

p
  .then(result => {
    console.log('Result:' , result);
  })
  .catch((error) => {
    console.log("ERROR: ", error.message);
  })
;

// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function display() {
  const customer = await getCustomer(1);
  console.log('Customer: ', customer);
  const topMovie = await getTopMovies();
  const email = await sendEmail(customer.email, topMovie);
  if(customer.isGold) {
    console.log('Top movies: ', topMovie);
    console.log('Email sent...', email);
  }
}

display();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 2000);  
  })
  
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  })
  
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([email, movies]);
    }, 2000);
  })
  
}
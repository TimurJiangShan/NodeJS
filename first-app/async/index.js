
function getUser(id) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Reading a user from a database');
      resolve({ id: id, gitHubUsername: 'jiangshan' });
    }, 2000);
  })
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling Github API...');
      resolve(['repo1','repo2','repo3']);  
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
      console.log('Calling Github API...');
      resolve(repo);
    }, 2000);
  })
}

console.log('Before');

// Async and await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    console.log('User: ', user);
    const repos = await getRepositories(user.gitHubUsername);
    console.log('Repos: ', repos);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (error) {
    console.log(error.message);
  }
}

displayCommits();
console.log('After');




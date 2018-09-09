console.log('Before');
getUser(1, (user) => {
    console.log(user)
});
console.log('After');

// Callbacks
// Pronises
// Async/await

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database');
        callback({ id: id, gitHubUsername: 'ramin' });
    }, 2000);
}
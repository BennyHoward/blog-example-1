// MongoDB User Collection Fixtures

// Create the collection
db.createCollection('users');

// Populate the collection with fixture data
db.users.insertMany(JSON.parse(cat('/docker-entrypoint-initdb.d/users-fixtures.json')));

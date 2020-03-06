import * as fs from 'fs';

const USERS_fIXTURES: string = JSON.stringify([
  { "username": "user1", "password": "xxxxxxx", "email": "user1@example.com" },
]);

fs.writeFile('./fixtures/users-fixtures.json', Buffer.from(USERS_fIXTURES, 'utf-8'), (err: NodeJS.ErrnoException | null): void => {
  if (err) {
    throw err;
  }
});

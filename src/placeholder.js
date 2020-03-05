// Placeholder application till the real one is done
const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = (() => {
  try {
    // Get the hostname from the Docker container
    return fs.readFileSync('/etc/hostname').toString().trim();
  } catch (e) {
    // Because it's running from the Mac and not the Docker container
    return 'localhost';
  }
})();
const PORT = process.env.APP_PORT || 3000;

const key = (() => {
  try {
    // Get the key from the Docker container
    return fs.readFileSync('/etc/ssl/certs/server.key');
  } catch (e) {
    // Because it's running from the Mac and not the Docker container
    return fs.readFileSync(path.join(__dirname, '../certs/server.key'));
  }
})();
const cert = (() => {
  try {
    // Get the cert from the Docker container
    return fs.readFileSync('/etc/ssl/certs/server.crt');
  } catch (e) {
    // Because it's running from the Mac and not the Docker container
    return fs.readFileSync(path.join(__dirname, '../certs/server.crt'));
  }
})();

https.createServer({ key, cert,}, (_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
}).listen(PORT, '0.0.0.0', () => {
  console.log('Server running at https://'+HOST+':'+PORT+'/');
  console.log();
  console.log('With the following environment variables:');
  console.log('- APP_PORT =', process.env.APP_PORT);
  console.log('- APP_MONGODB_HOST =', process.env.APP_MONGODB_HOST);
  console.log('- APP_MONGODB_USERNAME =', process.env.APP_MONGODB_USERNAME);
  console.log('- APP_MONGODB_PASSWORD =', process.env.APP_MONGODB_PASSWORD);
  console.log();
});

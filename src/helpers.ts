import { promisify } from 'util';
import { readFile } from 'fs';

/**
 * Promisified `fs.readFile` function.
 *
 * @param {(PathLike | number)} path
 * @returns {Promise<Buffer>}
 */
export const readFilePromise = promisify(readFile);

/**
 * Returns the key and cert file buffers.
 * First looks in a directory called `./certs/`.
 * If it doesn't find the key or cert file there, then it'll look in another directory called `/etc/ssl/certs/`.
 * It expects to find files called `server.key` and `server.crt`.
 *
 * @export
 * @returns {Promise<{key: Buffer, cert: Buffer}>}
 */
export async function getHttpsOptions(): Promise<{key: Buffer, cert: Buffer}> {
  let key: Buffer;
  try {
    key = await readFilePromise('./certs/server.key');
  } catch {
    key = await readFilePromise('/etc/ssl/certs/server.key');
  }
  let cert: Buffer;
  try {
    cert = await readFilePromise('./certs/server.crt');
  } catch {
    cert = await readFilePromise('/etc/ssl/certs/server.crt');
  }
  return {key, cert};
}

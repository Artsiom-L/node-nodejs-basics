import {createHash} from 'node:crypto';
import {createReadStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    // File path
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    // Create a hash object
    const hash = createHash('sha256');

    // Create a readable stream
    const stream = createReadStream(filePath);

    try {
        // Return a promise that resolves when the hash calculation is complete
        return new Promise((resolve, reject) => {
            // Handle stream events
            stream.on('data', (chunk) => {
                hash.update(chunk);
            });

            stream.on('end', () => {
                // Get the hex digest
                const hexHash = hash.digest('hex');
                console.log(hexHash);
                resolve();
            });

            stream.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error) {
        console.error('Error calculating hash: ', error);
        throw error;
    }
};

await calculateHash();
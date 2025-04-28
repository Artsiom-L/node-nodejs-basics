import {createReadStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {pipeline} from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    // File path
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    // Create a readable stream
    const readStream= createReadStream(filePath);

    // Pipe the readable stream to process.stdout
    await pipeline(readStream, process.stdout);
};

await read();
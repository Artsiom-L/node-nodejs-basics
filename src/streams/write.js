import {createWriteStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {pipeline} from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    // File path
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    // Create a writable stream
    const writableStream = createWriteStream(filePath);

    // Pipe process.stdin to the writable stream
    await pipeline(process.stdin, writableStream);
};

await write();
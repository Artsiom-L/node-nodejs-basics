import {createReadStream, createWriteStream} from 'node:fs';
import {createGzip} from 'node:zlib';
import {pipeline} from 'node:stream/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    // File paths
    const sourceFile = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destinationFile = path.join(__dirname, 'files', 'archive.gz');

    try {
        // Create streams
        const readStream = createReadStream(sourceFile);
        const writeStream = createWriteStream(destinationFile);
        const gzipStream = createGzip();

        // Use pipeline to handle streams properly
        await pipeline(
            readStream,
            gzipStream,
            writeStream
        );

        console.log('File compressed successfully');
    } catch (error) {
        console.error('Compression failed:', error);
        throw error;
    }
};

await compress();
import {createReadStream, createWriteStream} from 'node:fs';
import {createGunzip} from 'node:zlib';
import {pipeline} from 'node:stream/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    // File paths
    const sourceFile = path.join(__dirname, 'files', 'archive.gz');
    const destinationFile = path.join(__dirname, 'files', 'fileToCompress.txt');

    try {
        // Create streams
        const readStream = createReadStream(sourceFile);
        const writeStream = createWriteStream(destinationFile);
        const gunzipStream = createGunzip();

        // Use pipeline to handle streams properly
        await pipeline(
            readStream,
            gunzipStream,
            writeStream
        );

        console.log('File decompressed successfully');
    } catch (error) {
        console.error('Decompression failed:', error);
        throw error;
    }
};

await decompress();
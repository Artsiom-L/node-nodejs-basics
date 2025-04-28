import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const dirPath = path.join(__dirname, 'files');

    // Check if directory exists
    try {
        await fs.access(dirPath);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    // Read directory contents
    const files = await fs.readdir(dirPath);

    // Print filenames to console
    console.log(files);
};

await list();
import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');

    // Check if source file exists
    try {
        await fs.access(oldPath);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    // Check if destination file already exists
    try {
        await fs.access(newPath);
        throw new Error('FS operation failed');
    } catch (err) {
        // Only proceed if the error is because the file doesn't exist
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    // Rename the file
    await fs.rename(oldPath, newPath);
};

await rename();
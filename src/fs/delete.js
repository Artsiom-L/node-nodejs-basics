import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    // Check if file exists
    try {
        await fs.access(filePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    // Delete the file
    await fs.unlink(filePath);
};

await remove();
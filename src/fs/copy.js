import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    try {
        const sourceDir = path.join(__dirname, 'files');
        const targetDir = path.join(__dirname, 'files_copy');

        // Check if target already exists
        try {
            await fs.access(targetDir);
            throw new Error('FS operation failed');
        } catch (err) {
            // Only proceed if the error is because the directory doesn't exist
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await fs.cp(sourceDir, targetDir, {recursive: true});
    } catch (error) {
        // if files folder doesn't exist
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await copy();

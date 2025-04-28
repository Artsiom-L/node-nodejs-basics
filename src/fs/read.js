import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    try {
        // Read file content
        const content = await fs.readFile(filePath, {encoding: 'utf8', flag: 'r+'});

        // Print content to console
        console.log(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await read();
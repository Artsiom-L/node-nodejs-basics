import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    // Path to the script
    const scriptPath = path.join(__dirname, 'files', 'script.js');

    // Spawn child process
    const childProcess = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe'] // stdin, stdout, stderr
    });

    // Connect child's stdin to the parent process stdin
    process.stdin.pipe(childProcess.stdin);

    // Connect child's stdout to the parent process stdout
    childProcess.stdout.pipe(process.stdout);

    // Handle errors
    childProcess.on('error', (error) => {
        console.error(`Child process error: ${error.message}`);
    });

    // Return a promise that resolves when the child process exits
    return new Promise((resolve, reject) => {
        childProcess.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Child process exited with code ${code}`));
            }
        });
    });
};

// Put your arguments in function call to test this functionality
await spawnChildProcess(['Hello', 'from', 'child', 'process']);

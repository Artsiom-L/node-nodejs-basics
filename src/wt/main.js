import {Worker} from 'node:worker_threads';
import {cpus} from 'node:os';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    // Get the number of CPU cores
    const coresQuantity = cpus().length;

    // Get the worker script path
    const workerPath = path.join(__dirname, 'worker.js');

    // Create an array to store promises for each worker
    const workerPromises = [];

    // Create workers equal to the number of CPU cores
    for (let i = 0; i < coresQuantity; i++) {
        // Create a promise for each worker's result
        const workerPromise = new Promise((resolve) => {
            // Create a new worker
            const worker = new Worker(workerPath);

            // The value to send (10 + worker index)
            const valueToSend = 10 + i;

            // Handle messages from the worker
            worker.on('message', (result) => {
                worker.terminate();
                resolve(result);
            });

            // Handle worker errors
            worker.on('error', () => {
                worker.terminate();
                resolve({status: 'error', data: null});
            });

            // Send the value to the worker
            worker.postMessage(valueToSend);
        });

        workerPromises.push(workerPromise);
    }

    // Wait for all workers to complete
    const results = await Promise.all(workerPromises);

    // Log the results
    console.log(results);
};

await performCalculations();
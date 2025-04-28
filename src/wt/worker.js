import {parentPort} from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    // Listen for messages from the main thread
    parentPort.on('message', (n) => {
        try {
            // Calculate the nth Fibonacci number
            const result = nthFibonacci(n);

            // Send the result back to the main thread
            parentPort.postMessage({
                status: 'resolved',
                data: result
            });
        } catch (error) {
            // Send error message back to the main thread
            parentPort.postMessage({
                status: 'error',
                data: null
            });
        }
    });
};

sendResult();
import {Transform} from 'node:stream';
import {pipeline} from 'node:stream/promises';

const transform = async () => {
    // Create a transform stream that reverses text
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            // Convert buffer to string, reverse it, and push it back
            const input = chunk.toString();
            const reversed = input.split('').reverse().join('');
            this.push(reversed);
            callback();
        }
    });

    // Pipe stdin through transform stream to stdout
    await pipeline(process.stdin, reverseTransform, process.stdout);
};

await transform();
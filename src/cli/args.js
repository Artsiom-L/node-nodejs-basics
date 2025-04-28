const parseArgs = () => {
    // Get command line arguments (skip first two: node and script path)
    const args = process.argv.slice(2);
    const parsedArgs = {};
    
    // Parse arguments in format --propName value
    for (let i = 0; i < args.length; i += 2) {
        if (args[i].startsWith('--')) {
            const propName = args[i].slice(2); // Remove '--' prefix
            parsedArgs[propName] = args[i + 1];
        }
    }
    
    // Create the formatted output string
    const output = Object.entries(parsedArgs)
        .map(([key, value]) => `${key} is ${value}`)
        .join(', ');
    
    console.log(output);
};

parseArgs();
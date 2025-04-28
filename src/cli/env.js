const parseEnv = () => {
    // Filter environment variables that start with RSS_
    const rssEnvVars = Object.entries(process.env)
        .filter(([key]) => key.startsWith('RSS_'))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    
    // Create the formatted output string
    const output = Object.entries(rssEnvVars)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
    
    console.log(output);
};

parseEnv();
const fs = require('fs');
const readline = require('readline');
const writeStream = fs.createWriteStream('/app/data/processed-objects.txt');

function determineType(value) {
    // Strip spaces for alphanumeric check
    const strippedValue = value.trim();
    
    // Check if it's a number first
    if (!isNaN(value)) {
        return Number.isInteger(Number(value)) ? 'Integer' : 'Real number';
    }
    
    // Check if it's alphabetical
    if (/^[a-zA-Z]+$/.test(value)) {
        return 'Alphabetical string';
    }
    
    // Check if stripped value is alphanumeric
    if (/^[a-zA-Z0-9]+$/.test(strippedValue)) {
        return 'Alphanumeric';
    }
    
    return 'Unknown type';
}

async function analyzeFile(filename) {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    for await (const line of rl) {
        const objects = line.split(',');
        
        objects.forEach(obj => {
            const type = determineType(obj);
            const objectWithType = `${obj.trim()} -> Type: ${type}`;
            console.log(`${obj.trim()} -> Type: ${type}`);
            generateFile(objectWithType);
        });
        writeStream.end();
    }
}

// To generate file with 10MB
async function generateFile(object) {
    try {
        const data = object + '\n';
        
        if (!writeStream.write(data)) {
            // Handle backpressure
            await new Promise(resolve => writeStream.once('drain', resolve));
        }
        
        console.log('File generation complete!');
        
    } catch (error) {
        console.error('Error generating file:', error);
        writeStream.end();
    }
}

// Analyze the generated file
analyzeFile('/data/random_objects.txt')
    .catch(error => console.error('Error analyzing file:', error));

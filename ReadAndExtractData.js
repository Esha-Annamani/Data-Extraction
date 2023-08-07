const fs = require('fs');
const readline = require('readline');
const { extractData } = require('./utils/DataExtract')


const readAndExtractData = (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const importantData = {
        ids: [],
        phoneNumbers: [],
        emails: [],
        datesOfBirth: [],
        personNames: [],
        countryNames: []
    };

    rl.on('line', (line) => {
        extractData(line, importantData);
    });

    rl.on('close', () => {
        console.log(`Important Data: ${filePath}`);
        console.log(importantData);
        console.log();
    });
}

module.exports = {
    readAndExtractData
}
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvDirectory = path.join(__dirname, '../data/csv');
const outputFilePath = path.join(__dirname, '../src/assets/aggregated_weather_data.json');

let aggregatedData = [];

fs.readdir(csvDirectory, (err, files) => {
    if (err) {
        console.error('Error reading CSV directory:', err);
        return;
    }

    const csvFiles = files.filter(file => file.endsWith('.csv'));
    let filesProcessed = 0;

    csvFiles.forEach(file => {
        const filePath = path.join(csvDirectory, file);
        const fileData = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                fileData.push(data);
            })
            .on('end', () => {
                aggregatedData = aggregatedData.concat(fileData);
                filesProcessed++;

                if (filesProcessed === csvFiles.length) {
                    fs.writeFileSync(outputFilePath, JSON.stringify(aggregatedData, null, 2));
                    console.log('Aggregated data written to', outputFilePath);
                }
            });
    });
});
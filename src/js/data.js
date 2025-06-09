// This file is responsible for loading and processing the weather data from the aggregated_weather_data.json file and the CSV files. It provides functions to retrieve data based on user interactions.

const dataFilePath = '../assets/aggregated_weather_data.json';

async function loadWeatherData() {
    const response = await fetch(dataFilePath);
    const data = await response.json();
    return data;
}

function getTemperatureData(data, year) {
    return data.filter(entry => new Date(entry.DATE).getFullYear() === year)
               .map(entry => ({
                   station: entry.STATION,
                   temperature: entry.TEMP,
                   date: entry.DATE
               }));
}

function getSummaryByRegion(data, region) {
    return data.filter(entry => entry.REGION === region)
               .reduce((summary, entry) => {
                   summary.totalTemperature += entry.TEMP;
                   summary.count += 1;
                   return summary;
               }, { totalTemperature: 0, count: 0 });
}

export { loadWeatherData, getTemperatureData, getSummaryByRegion };
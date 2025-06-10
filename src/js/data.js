// This file is responsible for loading and processing the weather data from the aggregated_weather_data.json file
// It provides functions to retrieve data based on user interactions for Mapbox GL JS

let WeatherData = null;

async function loadWeatherData() {
    try {
        const response = await fetch('./assets/aggregated_weather_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Weather data loaded successfully");
        WeatherData = data;
        return data;
    } catch (error) {
        console.warn("Could not load weather data from file, using demo data:", error);
        
        // Try to use demo data generator if available
        if (typeof window !== 'undefined' && window.generateDemoData) {
            console.log("Generating demo data...");
            WeatherData = window.generateDemoData();
            return WeatherData;
        } else {
            console.error("Demo data generator not available");
            return null;
        }
    }
}

// Get weather data for a specific year, returns an object with province names as keys
function getWeatherDataForYear(year, dataType = 'temperature') {
    if (!WeatherData || !WeatherData.weatherData) {
        console.warn("Weather data not loaded yet");
        return {};
    }

    const yearData = {};
    
    // Process each station's data
    WeatherData.weatherData.forEach(station => {
        const provinceName = station.province || getProvinceFromStation(station.station);
        
        if (station.data && Array.isArray(station.data)) {
            const yearRecords = station.data.filter(record => {
                const recordYear = new Date(record.date).getFullYear();
                return recordYear === year;
            });

            if (yearRecords.length > 0) {
                // Calculate average for the year
                let sum = 0;
                let count = 0;
                
                yearRecords.forEach(record => {
                    let value;
                    if (dataType === 'temperature') {
                        value = record.temperature;
                    } else if (dataType === 'rainfall') {
                        value = record.precipitation;
                    }
                    
                    if (value !== null && value !== undefined && !isNaN(value)) {
                        sum += value;
                        count++;
                    }
                });

                if (count > 0) {
                    const avgValue = sum / count;
                    if (!yearData[provinceName]) {
                        yearData[provinceName] = [];
                    }
                    yearData[provinceName].push(avgValue);
                }
            }
        }
    });

    // Average values for each province
    const result = {};
    Object.keys(yearData).forEach(province => {
        const values = yearData[province];
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        result[province] = avg;
    });

    return result;
}

// Improved station to province mapping
function getProvinceFromStation(stationId) {
    // Enhanced mapping based on station IDs
    const stationProvinceMap = {
        '54511': 'Beijing',
        '58362': 'Shanghai', 
        '59287': 'Guangdong',
        '56294': 'Sichuan',
        '51463': 'Xinjiang',
        '55591': 'Tibet',
        '50953': 'Heilongjiang',
        '59758': 'Hainan',
        // Add more mappings as needed
    };
    
    return stationProvinceMap[stationId] || 'Unknown';
}

// Get historical data for a specific province
function getProvinceHistoricalData(provinceName) {
    if (!WeatherData) return null;

    const historicalData = {
        temperature: [],
        rainfall: [],
        years: []
    };

    // Generate data for sample years to demonstrate functionality
    const sampleYears = [1945, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2024];
    
    sampleYears.forEach(year => {
        const yearTempData = getWeatherDataForYear(year, 'temperature');
        const yearRainData = getWeatherDataForYear(year, 'rainfall');
        
        if (yearTempData[provinceName] !== undefined) {
            historicalData.years.push(year);
            historicalData.temperature.push(yearTempData[provinceName]);
            historicalData.rainfall.push(yearRainData[provinceName] || 0);
        }
    });

    return historicalData.years.length > 0 ? historicalData : null;
}

// Expose functions to be called by other modules
window.dataModule = {
    loadWeatherData,
    getWeatherDataForYear,
    getProvinceHistoricalData,
    getWeatherData: () => WeatherData
};
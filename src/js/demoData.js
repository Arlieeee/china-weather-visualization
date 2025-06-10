// Demo data generator for China Weather Visualization
// This script generates sample weather data for demonstration purposes

function generateDemoData() {
    const provinces = ['Beijing', 'Shanghai', 'Guangdong', 'Sichuan', 'Xinjiang', 'Tibet', 'Heilongjiang', 'Hainan'];
    const years = [];
    
    // Generate data for every 5 years from 1945 to 2024
    for (let year = 1945; year <= 2024; year += 5) {
        years.push(year);
    }
    
    const weatherData = [];
    
    provinces.forEach((province, index) => {
        const stationId = `5${4511 + index}`;
        const stationData = {
            station: stationId,
            province: province,
            data: []
        };
        
        years.forEach(year => {
            // Generate temperature based on province and year
            let baseTemp;
            switch (province) {
                case 'Beijing': baseTemp = 12; break;
                case 'Shanghai': baseTemp = 16; break;
                case 'Guangdong': baseTemp = 22; break;
                case 'Sichuan': baseTemp = 16; break;
                case 'Xinjiang': baseTemp = 8; break;
                case 'Tibet': baseTemp = 2; break;
                case 'Heilongjiang': baseTemp = 4; break;
                case 'Hainan': baseTemp = 25; break;
                default: baseTemp = 15;
            }
            
            // Add climate change trend (slight warming over time)
            const climateChange = (year - 1945) * 0.02;
            
            // Add random variation
            const randomVariation = (Math.random() - 0.5) * 8;
            const temperature = baseTemp + climateChange + randomVariation;
            
            // Generate precipitation
            let basePrecipitation;
            switch (province) {
                case 'Beijing': basePrecipitation = 2; break;
                case 'Shanghai': basePrecipitation = 8; break;
                case 'Guangdong': basePrecipitation = 15; break;
                case 'Sichuan': basePrecipitation = 12; break;
                case 'Xinjiang': basePrecipitation = 0.5; break;
                case 'Tibet': basePrecipitation = 1; break;
                case 'Heilongjiang': basePrecipitation = 3; break;
                case 'Hainan': basePrecipitation = 20; break;
                default: basePrecipitation = 5;
            }
            
            const precipitation = Math.max(0, basePrecipitation + (Math.random() - 0.5) * basePrecipitation);
            
            stationData.data.push({
                date: `${year}-01-01`,
                temperature: Math.round(temperature * 10) / 10,
                humidity: Math.round((50 + Math.random() * 30)),
                pressure: Math.round((1000 + Math.random() * 50) * 10) / 10,
                visibility: Math.round((15 + Math.random() * 25)),
                windSpeed: Math.round((Math.random() * 8) * 10) / 10,
                maxTemp: Math.round((temperature + Math.random() * 5) * 10) / 10,
                minTemp: Math.round((temperature - Math.random() * 5) * 10) / 10,
                precipitation: Math.round(precipitation * 10) / 10,
                snowDepth: temperature < 0 ? Math.round(Math.random() * 20) : null,
                weatherType: precipitation > 10 ? "Rain" : precipitation > 5 ? "Cloudy" : "Clear"
            });
        });
        
        weatherData.push(stationData);
    });
    
    return { weatherData };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateDemoData };
} else if (typeof window !== 'undefined') {
    window.generateDemoData = generateDemoData;
}

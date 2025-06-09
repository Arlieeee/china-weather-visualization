// File: /china-weather-visualization/china-weather-visualization/src/js/main.js

// Initialize ECharts instance
const chartDom = document.getElementById('main');
const myChart = echarts.init(chartDom);

// Load geographical data for China
fetch('./assets/china-geo.json')
    .then(response => response.json())
    .then(geoData => {
        // Load aggregated weather data
        return fetch('./assets/aggregated_weather_data.json')
            .then(response => response.json())
            .then(weatherData => {
                // Set up the map option
                const option = {
                    title: {
                        text: 'Meteorological Data Visualization',
                        subtext: 'Temperature Changes from 1942 to 2024',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            return `${params.name}<br/>Temperature: ${params.value[2]}°C`;
                        }
                    },
                    visualMap: {
                        min: -10,
                        max: 40,
                        left: 'left',
                        top: 'bottom',
                        text: ['High', 'Low'],
                        calculable: true,
                        inRange: {
                            color: ['#67f0c1', '#ffcc00', '#ff0000']
                        }
                    },
                    series: [
                        {
                            name: 'Temperature',
                            type: 'map',
                            map: 'china',
                            roam: true,
                            label: {
                                show: true
                            },
                            data: weatherData.map(item => ({
                                name: item.province,
                                value: item.temperature
                            }))
                        }
                    ]
                };

                // Set the option and render the chart
                myChart.setOption(option);

                // Handle window resize
                window.addEventListener('resize', myChart.resize);
            });
    })
    .catch(error => console.error('Error loading data:', error));

// Animation control (play, pause, fast forward)
let animationInterval;
let currentYear = 1942;

function startAnimation() {
    animationInterval = setInterval(() => {
        if (currentYear <= 2024) {
            updateDataForYear(currentYear);
            currentYear++;
        } else {
            clearInterval(animationInterval);
        }
    }, 1000); // Update every second
}

function pauseAnimation() {
    clearInterval(animationInterval);
}

function fastForward() {
    currentYear += 5; // Skip 5 years
    if (currentYear > 2024) {
        currentYear = 2024;
    }
    updateDataForYear(currentYear);
}

function updateDataForYear(year) {
    // Fetch and update data for the specified year
    fetch('./assets/aggregated_weather_data.json')
        .then(response => response.json())
        .then(weatherData => {
            const filteredData = weatherData.filter(item => item.year === year);
            myChart.setOption({
                series: [{
                    data: filteredData.map(item => ({
                        name: item.province,
                        value: item.temperature
                    }))
                }]
            });
        });
}

// Event listeners for animation controls
document.getElementById('playButton').addEventListener('click', startAnimation);
document.getElementById('pauseButton').addEventListener('click', pauseAnimation);
document.getElementById('fastForwardButton').addEventListener('click', fastForward);
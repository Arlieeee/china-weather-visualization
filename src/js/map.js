// File: /china-weather-visualization/china-weather-visualization/src/js/map.js

const mapContainer = document.getElementById('map');
const myChart = echarts.init(mapContainer);

// Load geographical data for China
fetch('../assets/china-geo.json')
    .then(response => response.json())
    .then(geoJson => {
        echarts.registerMap('China', geoJson);
        renderMap();
    });

function renderMap() {
    const option = {
        title: {
            text: 'Meteorological Data Visualization',
            subtext: 'Hover over regions for details',
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
                color: ['#67f0c8', '#ff4500']
            }
        },
        series: [
            {
                name: 'Temperature',
                type: 'map',
                map: 'China',
                roam: true,
                label: {
                    show: true
                },
                data: [] // This will be populated with actual data
            }
        ]
    };

    myChart.setOption(option);
}

// Function to update map data based on user selection
function updateMapData(data) {
    const seriesData = data.map(item => ({
        name: item.region,
        value: [item.longitude, item.latitude, item.temperature]
    }));

    myChart.setOption({
        series: [{
            data: seriesData
        }]
    });
}

// Event listeners for user interactions can be added here
// For example, to handle clicks on regions or dropdown selections

// Resize chart on window resize
window.addEventListener('resize', () => {
    myChart.resize();
});
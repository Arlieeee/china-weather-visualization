// File: /china-weather-visualization/src/js/ui.js
// UI controls and province summary display for Mapbox GL JS implementation

function setupUIEventListeners() {
    console.log("Setting up UI event listeners");
    
    // Data type selector is handled in animation.js
    // Additional UI setup can be added here
}

function displayProvinceSummary(provinceName) {
    console.log(`Displaying summary for province: ${provinceName}`);
    
    const summaryDiv = document.getElementById('summary');
    if (!summaryDiv) {
        console.warn("Summary div not found");
        return;
    }

    // Get historical data for the province
    const historicalData = window.dataModule.getProvinceHistoricalData(provinceName);
    
    if (!historicalData || historicalData.years.length === 0) {
        summaryDiv.innerHTML = `<h3>No historical data available for ${provinceName}</h3>`;
        return;
    }

    // Create container for charts
    summaryDiv.innerHTML = `
        <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>Historical Weather Data for ${provinceName}</h3>
            <div id="temperature-chart" style="width: 100%; height: 300px; margin-bottom: 20px;"></div>
            <div id="rainfall-chart" style="width: 100%; height: 300px;"></div>
        </div>
    `;

    // Create temperature chart using ECharts
    setTimeout(() => {
        createTemperatureChart(provinceName, historicalData);
        createRainfallChart(provinceName, historicalData);
    }, 100);
}

function createTemperatureChart(provinceName, data) {
    const chartDom = document.getElementById('temperature-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    
    const option = {
        title: {
            text: `Temperature Trends - ${provinceName}`,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return `${params[0].name}<br/>Temperature: ${params[0].value.toFixed(1)}°C`;
            }
        },
        xAxis: {
            type: 'category',
            data: data.years,
            name: 'Year'
        },
        yAxis: {
            type: 'value',
            name: 'Temperature (°C)'
        },
        series: [{
            name: 'Temperature',
            type: 'line',
            smooth: true,
            data: data.temperature,
            itemStyle: {
                color: '#ff6b6b'
            },
            lineStyle: {
                color: '#ff6b6b',
                width: 2
            }
        }],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        }
    };

    myChart.setOption(option);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

function createRainfallChart(provinceName, data) {
    const chartDom = document.getElementById('rainfall-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    
    const option = {
        title: {
            text: `Rainfall Trends - ${provinceName}`,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return `${params[0].name}<br/>Rainfall: ${params[0].value.toFixed(1)}mm`;
            }
        },
        xAxis: {
            type: 'category',
            data: data.years,
            name: 'Year'
        },
        yAxis: {
            type: 'value',
            name: 'Rainfall (mm)'
        },
        series: [{
            name: 'Rainfall',
            type: 'bar',
            data: data.rainfall,
            itemStyle: {
                color: '#4dabf7'
            }
        }],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        }
    };

    myChart.setOption(option);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// Expose functions to be called by other modules
window.uiModule = {
    setupUIEventListeners,
    displayProvinceSummary
};
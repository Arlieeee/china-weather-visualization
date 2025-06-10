// File: /china-weather-visualization/src/js/map.js
// Mapbox GL JS implementation for China weather visualization

// Replace with your actual Mapbox access token
// You can get one from https://account.mapbox.com/access-tokens/
mapboxgl.accessToken = 'pk.eyJ1IjoieG8yazQzNjciLCJhIjoiY21icHdsbnp3MDh2dTJrb2xnaW9pcWx5byJ9.l07aQWYQ-WDnMdGr4EKq1Q';

let map;
let mapWeatherData;
let chinaGeoJson;

// Color scales for different data types
function getTemperatureColor(temp) {
    if (temp === undefined || temp === null || isNaN(temp)) return '#cccccc';
    
    // Temperature color scale (blue to red)
    if (temp < -10) return '#000080'; // Navy
    if (temp < 0) return '#0000FF';   // Blue
    if (temp < 10) return '#00FFFF';  // Cyan
    if (temp < 20) return '#00FF00';  // Green
    if (temp < 30) return '#FFFF00';  // Yellow
    if (temp < 40) return '#FF8C00';  // Orange
    return '#FF0000'; // Red
}

function getRainfallColor(rainfall) {
    if (rainfall === undefined || rainfall === null || isNaN(rainfall)) return '#cccccc';
    
    // Rainfall color scale (light to dark blue)
    if (rainfall < 10) return '#F0F8FF';   // Alice Blue
    if (rainfall < 50) return '#ADD8E6';   // Light Blue
    if (rainfall < 100) return '#87CEEB';  // Sky Blue
    if (rainfall < 200) return '#4682B4';  // Steel Blue
    if (rainfall < 500) return '#0000CD';  // Medium Blue
    return '#000080'; // Navy
}

async function initializeMap(onMapLoadedCallback) {
    try {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-v9', // You can change this style
            center: [104, 35.5], // Center of China
            zoom: 3,
            minZoom: 2,
            maxZoom: 10
        });

        map.on('load', async () => {
            console.log('Mapbox map loaded');
            
            try {
                // Load China GeoJSON
                const geoResponse = await fetch('./assets/china-geo.json');
                if (!geoResponse.ok) throw new Error(`Failed to load GeoJSON: ${geoResponse.status}`);
                chinaGeoJson = await geoResponse.json();

                // Add China provinces source
                map.addSource('china-provinces', {
                    'type': 'geojson',
                    'data': chinaGeoJson,
                    'promoteId': 'name' // Use 'name' property as feature ID
                });

                // Add fill layer for provinces
                map.addLayer({
                    'id': 'provinces-fill',
                    'type': 'fill',
                    'source': 'china-provinces',
                    'paint': {
                        'fill-color': '#cccccc',
                        'fill-opacity': 0.7
                    }
                });

                // Add border layer for provinces
                map.addLayer({
                    'id': 'provinces-borders',
                    'type': 'line',
                    'source': 'china-provinces',
                    'paint': {
                        'line-color': '#ffffff',
                        'line-width': 1
                    }
                });

                // Load weather data
                mapWeatherData = await window.dataModule.loadWeatherData();
                console.log("Weather data loaded for Mapbox");

                // Set up map interactions
                setupMapInteractions();

                if (onMapLoadedCallback) {
                    onMapLoadedCallback();
                }

            } catch (error) {
                console.error("Failed to load map data:", error);
                document.getElementById('map').innerHTML = `<div style="color: red; padding: 20px;">Error loading map: ${error.message}<br>Please check your Mapbox token and data files.</div>`;
            }
        });

        map.on('error', (e) => {
            console.error('Mapbox error:', e);
            document.getElementById('map').innerHTML = `<div style="color: red; padding: 20px;">Mapbox error: Please check your access token.</div>`;
        });

    } catch (error) {
        console.error("Failed to initialize map:", error);
        document.getElementById('map').innerHTML = `<div style="color: red; padding: 20px;">Failed to initialize map: ${error.message}</div>`;
    }
}

function setupMapInteractions() {
    // Create popup for hover information
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // Mouse enter event
    map.on('mouseenter', 'provinces-fill', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        
        if (e.features.length > 0) {
            const feature = e.features[0];
            const provinceName = feature.properties.name;
            
            // Get current year and data type
            const currentYear = parseInt(document.getElementById('time-range-slider').value);
            const currentDataType = document.getElementById('data-type').value;
            
            // Get data for this province and year
            const yearData = window.dataModule.getWeatherDataForYear(currentYear, currentDataType);
            const value = yearData[provinceName];
            
            let displayValue = 'N/A';
            let unit = '';
            
            if (value !== undefined && value !== null && !isNaN(value)) {
                if (currentDataType === 'temperature') {
                    displayValue = value.toFixed(1);
                    unit = '°C';
                } else if (currentDataType === 'rainfall') {
                    displayValue = value.toFixed(1);
                    unit = 'mm';
                }
            }

            popup.setLngLat(e.lngLat)
                 .setHTML(`<strong>${provinceName}</strong><br>${currentDataType}: ${displayValue}${unit}`)
                 .addTo(map);
        }
    });

    // Mouse leave event
    map.on('mouseleave', 'provinces-fill', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    // Click event for province summary
    map.on('click', 'provinces-fill', (e) => {
        if (e.features.length > 0) {
            const provinceName = e.features[0].properties.name;
            console.log(`Clicked on: ${provinceName}`);
            
            // Call UI module to display summary
            if (window.uiModule && window.uiModule.displayProvinceSummary) {
                window.uiModule.displayProvinceSummary(provinceName);
            }
        }
    });
}

function updateMapVisualization(year, dataType) {
    if (!map || !map.isStyleLoaded() || !mapWeatherData) {
        console.warn("Map or data not ready for update");
        return;
    }

    console.log(`Updating map for year ${year}, data type: ${dataType}`);

    // Get data for the specified year and type
    const yearData = window.dataModule.getWeatherDataForYear(year, dataType);
    
    if (!yearData || Object.keys(yearData).length === 0) {
        console.warn(`No data found for year ${year}`);
        // Set default color for all provinces
        map.setPaintProperty('provinces-fill', 'fill-color', '#cccccc');
        return;
    }

    // Get all valid values for color scaling
    const values = Object.values(yearData).filter(v => v !== null && v !== undefined && !isNaN(v));
    
    if (values.length === 0) {
        map.setPaintProperty('provinces-fill', 'fill-color', '#cccccc');
        return;
    }

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const midValue = (minValue + maxValue) / 2;

    // Create a more robust color expression
    const colorCases = [];
    Object.entries(yearData).forEach(([province, value]) => {
        if (value !== null && value !== undefined && !isNaN(value)) {
            colorCases.push(['==', ['get', 'name'], province]);
            
            // Normalize value to 0-1 range
            const normalizedValue = maxValue > minValue ? (value - minValue) / (maxValue - minValue) : 0.5;
            
            // Generate color based on data type and normalized value
            let color;
            if (dataType === 'temperature') {
                if (normalizedValue < 0.2) color = '#0000FF'; // Cold - Blue
                else if (normalizedValue < 0.4) color = '#00FFFF'; // Cool - Cyan
                else if (normalizedValue < 0.6) color = '#00FF00'; // Moderate - Green
                else if (normalizedValue < 0.8) color = '#FFFF00'; // Warm - Yellow
                else color = '#FF0000'; // Hot - Red
            } else if (dataType === 'rainfall') {
                if (normalizedValue < 0.2) color = '#F0F8FF'; // Low rain - Alice Blue
                else if (normalizedValue < 0.4) color = '#ADD8E6'; // Light rain - Light Blue
                else if (normalizedValue < 0.6) color = '#87CEEB'; // Moderate rain - Sky Blue
                else if (normalizedValue < 0.8) color = '#4682B4'; // Heavy rain - Steel Blue
                else color = '#000080'; // Very heavy rain - Navy
            } else {
                color = '#cccccc'; // Default
            }
            
            colorCases.push(color);
        }
    });

    // Build the final color expression
    const colorExpression = [
        'case',
        ...colorCases,
        '#cccccc' // Default color for provinces without data
    ];

    // Update the fill color
    map.setPaintProperty('provinces-fill', 'fill-color', colorExpression);
}

// Expose functions to be called by other modules
window.mapboxMapModule = {
    initializeMap,
    updateMapVisualization,
    getMapInstance: () => map
};
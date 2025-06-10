# China Weather Visualization Project

This project is an interactive web application that visualizes meteorological information from weather stations across China using **Mapbox GL JS**. It features an animated display of temperature and rainfall changes from 1942 to 2024 and provides options for viewing historical data summaries for different provinces.

## Features

- **Interactive Map**: High-performance WebGL-based map visualization using Mapbox GL JS
- **Time Animation**: Animated visualization of weather data changes over decades
- **Multiple Data Types**: Temperature and rainfall visualization
- **Province Details**: Click on provinces to view historical data charts
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Mapbox GL JS**: High-performance WebGL map rendering
- **ECharts**: Statistical charts for province summaries
- **Vanilla JavaScript**: No heavy frameworks, lightweight and fast
- **CSS3**: Modern responsive styling

## Project Structure

```
china-weather-visualization/
├── MAPBOX_SETUP.md          # Mapbox token setup guide
├── start.ps1                # Quick start script for Windows
├── package.json             # npm configuration
├── README.md               # This file
├── data/
│   └── csv/               # Raw CSV weather data files
├── scripts/
│   └── aggregate_data.js  # Data aggregation script
└── src/
    ├── index.html         # Main HTML file
    ├── assets/
    │   ├── aggregated_weather_data.json  # Processed weather data
    │   └── china-geo.json               # Chinese provinces GeoJSON
    ├── css/
    │   └── styles.css     # Application styles
    └── js/
        ├── animation.js   # Animation controls
        ├── data.js       # Data loading and processing
        ├── demoData.js   # Demo data generator
        ├── main.js       # Application entry point
        ├── map.js        # Mapbox GL JS map implementation
        └── ui.js         # User interface controls
```

## Troubleshooting

### Common Issues

1. **Map not loading**
   - Check your Mapbox access token in `src/js/map.js`
   - Ensure you have an internet connection
   - Check browser console for error messages

2. **No weather data**
   - The application will automatically use demo data if the main data file is unavailable
   - Check if `src/assets/aggregated_weather_data.json` exists
   - Run `npm run aggregate` to generate data from CSV files

3. **Server not starting**
   - Ensure Node.js is installed (`node --version`)
   - Run `npm install` to install dependencies
   - Try using `npm start` instead of `npm run dev`

4. **Animation not working**
   - Check browser console for JavaScript errors
   - Ensure all script files are loading correctly
   - Try refreshing the page

### Browser Compatibility
- Chrome 50+
- Firefox 50+
- Safari 12+
- Edge 79+

### Performance Tips
- Use the latest version of your browser
- Close other tabs if experiencing slowness
- For large datasets, consider reducing the time range or data frequency

## Setup Instructions

### Prerequisites
- Node.js (version 12 or higher)
- A Mapbox account and access token

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd china-weather-visualization
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Mapbox Access Token**:
   - Visit [Mapbox Access Tokens](https://account.mapbox.com/access-tokens/)
   - Create an account or log in
   - Copy your public access token
   - Open `src/js/map.js` and replace the placeholder token:
   ```javascript
   mapboxgl.accessToken = 'YOUR_ACTUAL_MAPBOX_TOKEN_HERE';
   ```

4. **Prepare data** (if needed):
   ```bash
   npm run aggregate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start a local server at `http://localhost:8080` and open it in your browser.

## Usage

### Controls
- **Play/Pause/Fast Forward**: Control the animation of weather data over time
- **Data Type Selector**: Switch between temperature and rainfall visualization
- **Time Slider**: Manually navigate to specific years (1942-2024)
- **Province Click**: Click on any province to view detailed historical charts

### Features
- **Real-time Animation**: Watch weather patterns change over decades
- **Interactive Tooltips**: Hover over provinces to see current values
- **Historical Analysis**: Click provinces for detailed temporal analysis
- **Responsive Design**: Works on desktop and mobile devices

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
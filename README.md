# China Weather Visualization Project

This project is an interactive web application that visualizes meteorological information from approximately 1000 weather stations across China. It features an animated display of temperature changes from 1942 to 2024 and provides options for viewing historical data summaries for different regions.

## Project Structure

The project is organized as follows:

```
china-weather-visualization
├── src
│   ├── index.html              # Main HTML file serving as the entry point
│   ├── js
│   │   ├── main.js             # Initializes ECharts and handles visualizations
│   │   ├── data.js             # Loads and processes weather data
│   │   ├── map.js              # Renders the interactive map of China
│   │   ├── animation.js         # Manages temperature animation
│   │   └── ui.js               # Handles user interface elements
│   ├── css
│   │   └── styles.css          # Styles for the web application
│   └── assets
│       ├── china-geo.json      # Geographical data for China
│       └── aggregated_weather_data.json # Aggregated weather data
├── data
│   └── csv
│       ├── station_001.csv     # Individual CSV files for each weather station
│       └── ...
├── scripts
│   └── aggregate_data.js       # Logic for aggregating CSV files into JSON
├── package.json                 # npm configuration file
└── README.md                    # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd china-weather-visualization
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```
   npm install
   ```

3. **Run the aggregation script**:
   To aggregate the individual CSV files into a single JSON file, execute:
   ```
   node scripts/aggregate_data.js
   ```

4. **Open the application**:
   Open `src/index.html` in a web browser to view the interactive visualization.

## Usage

- Use the dropdown menus to select different types of meteorological data and time ranges.
- Hover over different regions on the map to view detailed meteorological information.
- Control the animation of temperature changes using the provided play, pause, and fast forward buttons.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
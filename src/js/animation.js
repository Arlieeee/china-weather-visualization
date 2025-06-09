// File: /china-weather-visualization/china-weather-visualization/src/js/animation.js

let currentYear = 1942;
let animationInterval;
const totalYears = 83; // From 1942 to 2024

function startAnimation() {
    animationInterval = setInterval(() => {
        if (currentYear <= 2024) {
            updateTemperatureData(currentYear);
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
    clearInterval(animationInterval);
    currentYear += 5; // Fast forward by 5 years
    if (currentYear > 2024) {
        currentYear = 2024;
    }
    updateTemperatureData(currentYear);
}

function updateTemperatureData(year) {
    // Fetch and update the temperature data for the given year
    // This function should interact with the data.js to get the relevant data
    console.log(`Updating data for year: ${year}`);
    // Example: fetchDataForYear(year);
}

// Event listeners for UI controls
document.getElementById('playButton').addEventListener('click', startAnimation);
document.getElementById('pauseButton').addEventListener('click', pauseAnimation);
document.getElementById('fastForwardButton').addEventListener('click', fastForward);
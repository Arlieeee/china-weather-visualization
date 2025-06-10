// File: /china-weather-visualization/src/js/animation.js
// Animation controls for Mapbox GL JS implementation

let currentYear = 1942;
let animationInterval;
let isPlaying = false;
const minYear = 1942;
const maxYear = 2024;

function updateVisualizationForYear(year) {
    // Update UI elements
    document.getElementById('current-year-display').textContent = year;
    document.getElementById('time-range-slider').value = year;

    // Get current data type
    const dataType = document.getElementById('data-type').value;

    // Update map visualization
    if (window.mapboxMapModule && typeof window.mapboxMapModule.updateMapVisualization === 'function') {
        window.mapboxMapModule.updateMapVisualization(year, dataType);
    } else {
        console.warn("Mapbox module or update function not available");
    }
}

function startAnimation() {
    if (isPlaying) return;
    
    isPlaying = true;
    document.getElementById('play').disabled = true;
    document.getElementById('pause').disabled = false;
    
    animationInterval = setInterval(() => {
        if (currentYear <= maxYear) {
            updateVisualizationForYear(currentYear);
            currentYear++;
        } else {
            stopAnimation();
            currentYear = minYear; // Reset for next play
        }
    }, 500); // Update every 500ms for smoother animation
}

function pauseAnimation() {
    isPlaying = false;
    clearInterval(animationInterval);
    document.getElementById('play').disabled = false;
    document.getElementById('pause').disabled = true;
}

function stopAnimation() {
    pauseAnimation();
    currentYear = minYear;
}

function fastForward() {
    if (isPlaying) {
        pauseAnimation();
    }
    
    currentYear += 5; // Fast forward by 5 years
    if (currentYear > maxYear) {
        currentYear = maxYear;
    }
    updateVisualizationForYear(currentYear);
}

function setupAnimationControls() {
    // Set initial year
    currentYear = minYear;
    updateVisualizationForYear(currentYear);

    // Play button
    const playButton = document.getElementById('play');
    if (playButton) {
        playButton.addEventListener('click', startAnimation);
    }

    // Pause button
    const pauseButton = document.getElementById('pause');
    if (pauseButton) {
        pauseButton.addEventListener('click', pauseAnimation);
        pauseButton.disabled = true; // Initially disabled
    }

    // Fast forward button
    const ffButton = document.getElementById('fast-forward');
    if (ffButton) {
        ffButton.addEventListener('click', fastForward);
    }

    // Time range slider
    const timeSlider = document.getElementById('time-range-slider');
    if (timeSlider) {
        timeSlider.addEventListener('input', (e) => {
            if (isPlaying) {
                pauseAnimation();
            }
            currentYear = parseInt(e.target.value);
            updateVisualizationForYear(currentYear);
        });
    }

    // Data type selector
    const dataTypeSelect = document.getElementById('data-type');
    if (dataTypeSelect) {
        dataTypeSelect.addEventListener('change', (e) => {
            const newDataType = e.target.value;
            updateVisualizationForYear(currentYear);
        });
    }

    console.log("Animation controls initialized");
}

// Expose functions to be called by other modules
window.animationModule = {
    setupAnimationControls,
    startAnimation,
    pauseAnimation,
    fastForward,
    updateVisualizationForYear,
    getCurrentYear: () => currentYear
};
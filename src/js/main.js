// File: /china-weather-visualization/src/js/main.js
// Main application entry point for Mapbox GL JS implementation

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded. Initializing China Weather Visualization with Mapbox GL JS.");

    // Check if Mapbox GL is available
    if (typeof mapboxgl === 'undefined') {
        console.error("Mapbox GL JS not loaded. Please check your internet connection and script tags.");
        document.getElementById('map').innerHTML = '<div style="color: red; padding: 20px;">Mapbox GL JS failed to load. Please check your internet connection.</div>';
        return;
    }

    // Initialize the Mapbox map
    if (window.mapboxMapModule && typeof window.mapboxMapModule.initializeMap === 'function') {
        window.mapboxMapModule.initializeMap(() => {
            console.log("Mapbox map initialized successfully. Setting up UI and animation controls.");
            
            // Initialize UI event listeners
            if (window.uiModule && typeof window.uiModule.setupUIEventListeners === 'function') {
                window.uiModule.setupUIEventListeners();
            } else {
                console.warn("UI module not found");
            }

            // Initialize animation controls
            if (window.animationModule && typeof window.animationModule.setupAnimationControls === 'function') {
                window.animationModule.setupAnimationControls();
            } else {
                console.warn("Animation module not found");
            }

            // Display initial state
            console.log("Application initialized successfully");
        });
    } else {
        console.error("Mapbox map module not found. Map cannot be initialized.");
        document.getElementById('map').innerHTML = '<div style="color: red; padding: 20px;">Error: Map module failed to load.</div>';
    }
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (e.error && e.error.message && e.error.message.includes('mapbox')) {
        document.getElementById('map').innerHTML = '<div style="color: red; padding: 20px;">Mapbox error detected. Please check your access token and internet connection.</div>';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.mapboxMapModule && window.mapboxMapModule.getMapInstance) {
        const map = window.mapboxMapModule.getMapInstance();
        if (map) {
            map.resize();
        }
    }
});
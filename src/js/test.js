// Test script to validate project setup
console.log("=== China Weather Visualization Test ===");

// Test 1: Check if required globals are available
console.log("\n1. Testing global dependencies:");
console.log("- mapboxgl:", typeof mapboxgl !== 'undefined' ? "✓ Available" : "✗ Missing");
console.log("- echarts:", typeof echarts !== 'undefined' ? "✓ Available" : "✗ Missing");

// Test 2: Check if modules are loaded
console.log("\n2. Testing module availability:");
console.log("- dataModule:", typeof window.dataModule !== 'undefined' ? "✓ Available" : "✗ Missing");
console.log("- mapboxMapModule:", typeof window.mapboxMapModule !== 'undefined' ? "✓ Available" : "✗ Missing");
console.log("- animationModule:", typeof window.animationModule !== 'undefined' ? "✓ Available" : "✗ Missing");
console.log("- uiModule:", typeof window.uiModule !== 'undefined' ? "✓ Available" : "✗ Missing");

// Test 3: Check demo data generator
console.log("\n3. Testing demo data generator:");
if (typeof window.generateDemoData === 'function') {
    try {
        const demoData = window.generateDemoData();
        console.log("✓ Demo data generator working");
        console.log(`  Generated data for ${demoData.weatherData.length} stations`);
    } catch (error) {
        console.log("✗ Demo data generator error:", error.message);
    }
} else {
    console.log("✗ Demo data generator not available");
}

// Test 4: Check DOM elements
console.log("\n4. Testing DOM elements:");
const requiredElements = ['map', 'play', 'pause', 'fast-forward', 'data-type', 'time-range-slider', 'current-year-display'];
requiredElements.forEach(id => {
    const element = document.getElementById(id);
    console.log(`- #${id}:`, element ? "✓ Found" : "✗ Missing");
});

// Test 5: Test Mapbox token
console.log("\n5. Testing Mapbox configuration:");
if (typeof mapboxgl !== 'undefined' && mapboxgl.accessToken) {
    if (mapboxgl.accessToken.includes('example-token')) {
        console.log("⚠ Mapbox token is still the example token - please configure a real token");
    } else {
        console.log("✓ Mapbox token is configured");
    }
} else {
    console.log("✗ Mapbox token not configured");
}

console.log("\n=== Test Complete ===");
console.log("Check the console for any errors and refer to README.md for setup instructions.");

// Export test function for manual execution
window.runProjectTest = () => {
    console.clear();
    // Re-run all tests
    eval(document.querySelector('script[src*="test"]').textContent);
};

/*******************************
      Animation Functions
********************************/
// This code gets used in the intersectionObserver.js

import * as d3 from 'd3'

// Reset to original state
const resetAnimation = () => {
    d3.select('.asteroid-group')
        .selectAll('.asteroid')
        .transition('reset-animation')
        .duration(750)
        .attr('r', d => d.clampedRadius)
        .attr('opacity', d => d.magnitude)
}

// Close orbit animations
const showCloseOrbit = () => {
    d3.select('.asteroid-group')
        .selectAll('.asteroid')
        .filter(d => !d.closeEncounter)
        .transition('show-close-orbit')
        .duration(750)
        .attr('opacity', d => d.magnitude / 10)

    d3.select('.asteroid-group')
        .selectAll('.asteroid')
        .filter(d => d.closeEncounter)
        .transition('scale-close-orbit')
        .duration(750)
        .attr('r', d => d.clampedRadius * 3)}

// Hazardous asteroid animations
const showHazardousAsteroids = () => {
    d3.select('.asteroid-group')
        .selectAll('.asteroid')
        .filter(d => d.is_potentially_hazardous_asteroid)
        .transition('show-hazardous-asteroids')
        .duration(750)
        .attr('r', d => d.clampedRadius * 1.5)
    
    d3.select('.asteroid-group')
        .selectAll('.asteroid')
        .filter(d => !d.is_potentially_hazardous_asteroid)
        .transition('fade-non-hazardous-asteroids')
        .duration(750)
        .attr('opacity', d => d.magnitude / 5)
}

// Export functions
export { resetAnimation, showCloseOrbit, showHazardousAsteroids }
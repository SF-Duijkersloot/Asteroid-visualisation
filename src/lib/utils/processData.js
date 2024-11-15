// helpers.js
import * as d3 from "d3"

// Earth's actual diameter in meters
const EARTH_DIAMETER_METERS = 12742000
// Earth's SVG diameter in pixels
const EARTH_SVG_DIAMETER = 100

export function processAsteroidData(asteroids, minOrbitalRadius, maxOrbitalRadius, speedFactor) {
    // Calculate max distance for scaling
    let maxDistance = d3.max(asteroids, d => +d.close_approach_data[0].miss_distance.lunar)
    let minDistance = d3.min(asteroids, d => +d.close_approach_data[0].miss_distance.lunar)

    const orbitalRadiusScale = d3.scaleLinear()
        .domain([minDistance, maxDistance])
        .range([minOrbitalRadius, maxOrbitalRadius])

    return asteroids.map(asteroid => {
        const avgDiameterMeters = (+asteroid.estimated_diameter.meters.estimated_diameter_min +
                                   +asteroid.estimated_diameter.meters.estimated_diameter_max) / 2

        // Scale the asteroid size relative to Earth's SVG size
        const scaledCircleRadiusScale = d3.scaleLinear()
            .domain([0, EARTH_DIAMETER_METERS])
            .range([0, (EARTH_SVG_DIAMETER / 2) * 10000])
        
        const scaledCircleRadius = scaledCircleRadiusScale(avgDiameterMeters)

        const clampedRadiusScale = d3.scaleLinear()
            .domain([0, 150])
            .range([0, 150])
            .clamp(true)

        const clampedRadius = clampedRadiusScale(scaledCircleRadius)
        
        // Check is value has been clamped
        let isClamped = clampedRadius === 150

        const orbitalRadius = orbitalRadiusScale(+asteroid.close_approach_data[0].miss_distance.lunar)
        const rawOrbitalRadius = asteroid.close_approach_data[0].miss_distance.lunar
        const angularVelocity = +asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour / 100000 * speedFactor

        return {
            ...asteroid,
            orbitalRadius,
            rawOrbitalRadius,
            clampedRadius,
            isClamped,
            angle: Math.random() * 2 * Math.PI,
            angularVelocity
        }
    })
}
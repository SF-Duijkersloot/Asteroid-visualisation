import * as d3 from "d3"

// Variables
const earthDiameterMeters = 12742000
const earthSVGDiameter = 100
const scaleFactor = 25000

export function processAsteroidData(asteroids, minOrbitalRadius, maxOrbitalRadius, speedFactor) {
    // Calculate max distance for scaling
    let maxDistance = d3.max(asteroids, d => +d.close_approach_data[0].miss_distance.lunar)
    let minDistance = d3.min(asteroids, d => +d.close_approach_data[0].miss_distance.lunar)

    /*******************************
              Define scales
    ********************************/
    // Scale of the asteroids distance from Earth
    const orbitalRadiusScale = d3.scaleLinear()
        .domain([minDistance, maxDistance])
        .range([minOrbitalRadius, maxOrbitalRadius])

    // Scale the asteroid size relative to Earth's SVG size
    const scaledCircleRadiusScale = d3.scaleLinear()
        .domain([0, earthDiameterMeters])
        .range([0, (earthSVGDiameter / 2) * scaleFactor])
    
    // Clamp asteroid size to max value
    const clampedRadiusScale = d3.scaleLinear()
        .domain([0, 150])
        .range([0, 150])
        .clamp(true)

    /*******************************
               Map asteroid
    ********************************/
    return asteroids.map(asteroid => {
        const avgDiameterMeters = (+asteroid.estimated_diameter.meters.estimated_diameter_min +
                                   +asteroid.estimated_diameter.meters.estimated_diameter_max) / 2

        // Scale the asteroid size
        const scaledCircleRadius = scaledCircleRadiusScale(avgDiameterMeters)

        // Clamping and check if value is maxed out
        const clampedRadius = clampedRadiusScale(scaledCircleRadius)
        let isClamped = clampedRadius === 150
        
        // Distance from Earth
        const orbitalRadius = orbitalRadiusScale(+asteroid.close_approach_data[0].miss_distance.lunar)
        
        const rawOrbitalRadius = asteroid.close_approach_data[0].miss_distance.lunar // For debugging
        
        // Speed of the asteroid + scaling factor
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
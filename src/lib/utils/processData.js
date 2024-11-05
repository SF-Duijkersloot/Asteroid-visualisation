// helpers.js
import * as d3 from "d3"

export function processAsteroidData(asteroids, minOrbitalRadius, maxOrbitalRadius, speedFactor) {
    // Calculate max distance for scaling
    const maxDistance = d3.max(asteroids, d => +d.close_approach_data[0].miss_distance.lunar)
    
    const orbitalRadiusScale = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([minOrbitalRadius, maxOrbitalRadius])

    return asteroids.map(asteroid => {
        const avgDiameter = (+asteroid.estimated_diameter.meters.estimated_diameter_min +
                            +asteroid.estimated_diameter.meters.estimated_diameter_max) / 2
        const scaledCircleRadius = avgDiameter / 40
        const orbitalRadius = orbitalRadiusScale(+asteroid.close_approach_data[0].miss_distance.lunar)
        const angularVelocity = +asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour / 1e5 * speedFactor
            
        return {
            ...asteroid,
            orbitalRadius,
            scaledCircleRadius,
            angle: Math.random() * 2 * Math.PI,
            angularVelocity
        }
    })
}

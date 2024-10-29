<script>
    import { onMount } from "svelte"
    import * as d3 from "d3"
    
    import Asteroid from "./Asteroid.svelte"
    import Earth from "./Earth.svelte"
    import Controls from "./Controls.svelte"

    export let data
    const { asteroids } = data

    let width = 750
    let height = 750

    // Parameters
    let minOrbitalRadius = 150
    let maxOrbitalRadius = 300
    let speedFactor = 0.01

    // Center of the visualization
    const centerX = width / 2
    const centerY = height / 2

    // Scale orbital radius based on miss distance
    const maxDistance = d3.max(asteroids, (d) => +d.close_approach_data[0].miss_distance.lunar)
    const orbitalRadiusScale = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([minOrbitalRadius, maxOrbitalRadius])

    // Process asteroid data
    $: asteroidData = asteroids.map((asteroid) => {
        const avgDiameter = (+asteroid.estimated_diameter.meters.estimated_diameter_min +
                            +asteroid.estimated_diameter.meters.estimated_diameter_max) / 2
        const scaledCircleRadius = avgDiameter / 40
        const orbitalRadius = orbitalRadiusScale(+asteroid.close_approach_data[0].miss_distance.lunar)

        return {
            ...asteroid,
            orbitalRadius,
            scaledCircleRadius,
            angle: Math.random() * 2 * Math.PI,
            angularVelocity: +asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour / 1e5 * speedFactor
        }
    })

    let requestId
    const animateAsteroids = () => {
        asteroidData = asteroidData.map((asteroid) => ({
            ...asteroid,
            angle: (asteroid.angle + asteroid.angularVelocity) % (2 * Math.PI)
        }))
        requestId = requestAnimationFrame(animateAsteroids)
    }

    onMount(() => {
        requestId = requestAnimationFrame(animateAsteroids)
        return () => cancelAnimationFrame(requestId)
    })
</script>


<!-- HTML -->
<h1>Neo Data Visualization</h1>

<Controls bind:speedFactor />

<div class="chart-container">
    <svg {width} {height}>
        <g transform="translate({centerX}, {centerY})">
            {#each asteroidData as asteroid}
                <Asteroid {asteroid} />
            {/each}
        </g>
    </svg>
    <Earth />
</div>


<!-- CSS -->
<style>
    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }
</style>

<script>
    import { onMount } from "svelte"
    import { processAsteroidData } from "../utils/processData"
    
    import Asteroid from "./Asteroid.svelte"
    import Earth from "./Earth.svelte"
    import Controls from "./Controls.svelte"

    export let data
    const { asteroids } = data

    let width = 750
    let height = 750
    let minOrbitalRadius = 150
    let maxOrbitalRadius = 300
    let speedFactor = 0.01

    const centerX = width / 2
    const centerY = height / 2
    let isDebugMode
    // Processed data with helper function
    $: asteroidData = processAsteroidData(asteroids, minOrbitalRadius, maxOrbitalRadius, speedFactor)

    let requestId
    const animateAsteroids = () => {
        asteroidData = asteroidData.map(asteroid => ({
            ...asteroid,
            angle: (asteroid.angle + asteroid.angularVelocity) % (2 * Math.PI)
        }))
        requestId = requestAnimationFrame(animateAsteroids)
    }

    onMount(() => {
        isDebugMode = window.location.hash === "#debug" // Check if the URL contains #debug
        console.log(isDebugMode)
        requestId = requestAnimationFrame(animateAsteroids)
        return () => cancelAnimationFrame(requestId)
    })
</script>
{#if isDebugMode}
    <Controls bind:speedFactor bind:minOrbitalRadius bind:maxOrbitalRadius />
{/if}

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

<style>
    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }
</style>

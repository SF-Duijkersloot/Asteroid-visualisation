<script>
    import { onMount } from "svelte"
    import { processAsteroidData } from "../utils/processData"
    import Asteroid from "./Asteroid.svelte"
    import Earth from "./Earth.svelte"
    import Controls from "./Controls.svelte"

    export let data
    const { asteroids, date } = data

    let width = 750
    let height = 750
    let minOrbitalRadius = 150
    let maxOrbitalRadius = 300
    // $: moonRadius = maxOrbitalRadius / 4
    $: moonRadius = (maxOrbitalRadius - minOrbitalRadius) / 4 + minOrbitalRadius
    let speedFactor = 0.01

    const centerX = width / 2
    const centerY = height / 2
    let isDebugMode

    // Use the processed data structure
    $: asteroidData = processAsteroidData(asteroids, minOrbitalRadius, maxOrbitalRadius, speedFactor)

    let requestId
    const animateAsteroids = () => {
        asteroidData = asteroidData.map(asteroid => ({
            ...asteroid,
            angle: (asteroid.angle + asteroid.angularVelocity) % (2 * Math.PI),
        }))
        requestId = requestAnimationFrame(animateAsteroids)
    }

    let dangerousAsteroidObserver
    let dangerousAsteroidElement

    onMount(() => {
        isDebugMode = window.location.hash === '#debug'
        requestId = requestAnimationFrame(animateAsteroids)

        // Set up the intersection observer for the '.dangerous-asteroid' element
        dangerousAsteroidElement = document.querySelector('.dangerous-asteroid')
        dangerousAsteroidObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('Dangerous asteroid is in view')
                    fadeOutNonHazardousAsteroids()
                } else {
                    fadeInNonHazardousAsteroids()
                }
            }, { 
                rootMargin: '-50% 0px',
                threshold: 0.5 
            })
        })
        dangerousAsteroidObserver.observe(dangerousAsteroidElement)

        return () => {
            dangerousAsteroidObserver.unobserve(dangerousAsteroidElement)
            cancelAnimationFrame(requestId)
        }
    })
</script>

{#if isDebugMode}
    <Controls bind:speedFactor bind:minOrbitalRadius bind:maxOrbitalRadius />
{/if}

<div class="chart-container">
    <div class="chart-grouping">
        <svg {width} {height}>
            <g transform="translate({centerX}, {centerY})">
                <!-- Draw the circular line at 10 lunar distance using moonOrbitalRadius -->
                <circle
                    class="moon-orbit"
                    cx="0"
                    cy="0"
                    r={moonRadius}
                    stroke="white"
                    opacity="0.5"
                    stroke-width="1"
                    fill="none"
                    stroke-dasharray="10 10"
                />

                {#each asteroidData as asteroid}
                    <Asteroid {asteroid} />
                {/each}
            </g>
        </svg>
        <Earth />
    </div>

    <div class="asteroid-counter">
        <span>&larr;</span>
        <div>    
            <h3>{asteroidData.length} asteroids</h3>
            <p>passed within 4 times the distance between the Earth and the Moon over the past 30 days</p>
        </div>
        
    </div>
</div>

<style>
    svg {
        overflow: visible;
    }
    .chart-container {
        display: flex;
        position: sticky;
        top: 0;
        justify-content: center;
        align-items: center;
    }

    .chart-grouping {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .asteroid-counter {
        position: relative;
        display: flex;
        gap: 1em;
        font-size: .8em;
        width: 14em;
        color: white;
    }

    .asteroid-counter h3 {
        font-size: 1.1em;
        margin: 0 0 0.25em 0;
    }

    .asteroid-counter p {
        margin: 0;
    }
</style>
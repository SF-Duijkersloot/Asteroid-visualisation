<script>
    import * as d3 from "d3"
    import { onMount } from "svelte"
    import { processAsteroidData } from "../utils/processData"
    
    // Import animations from the utils folder
    import { fadeOutNonHazardousAsteroids, fadeInNonHazardousAsteroids } from "../utils/animations.js"
    
    import Asteroid from "./Asteroid.svelte"
    import Earth from "./Earth.svelte"
    import Controls from "./Controls.svelte"

    export let data
    const { asteroids, date } = data

    let width = 750
    let height = 750
    let minOrbitalRadius = 150
    let maxOrbitalRadius = 300
    let speedFactor = 0.01

    const centerX = width / 2
    const centerY = height / 2
    let isDebugMode
    let asteroidData = processAsteroidData(asteroids, minOrbitalRadius, maxOrbitalRadius, speedFactor)

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
                    // Fade out the asteroids that are not potentially hazardous
                    console.log('Dangerous asteroid is in view')
                    
                    fadeOutNonHazardousAsteroids()
                } else {
                    // Fade back in the non-hazardous asteroids
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
                {#each asteroidData as asteroid}
                    <Asteroid {asteroid} />
                {/each}
            </g>
        </svg>
        <Earth />
    </div>

    <div class="asteroid-counter">
        <span>&larr;</span>
        <p>
            {asteroidData.length} asteroids that have passed the earth from {date.start} to {date.end}
        </p>
    </div>
</div>

<style>
    .chart-container {
        display: flex;
        position: sticky;
        top: 0;
        justify-content: center;
        align-items: center;
        /* border: 1px solid red;*/
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
        font-size: 1em;
        width: 10em;
        color: white;
    }

    .asteroid-counter p {
        margin: 0;
    }
</style>

<script>
    import { onMount } from "svelte"
    import { processAsteroidData } from "../utils/processData"
    
    // Components
    import Asteroid from "./Asteroid.svelte"
    import Earth from "./Earth.svelte"
    import Controls from "./Controls.svelte"
    import MoonOrbit from './moonOrbit.svelte';

    export let data
    const { asteroids } = data

    let width = 600
    let height = 600
    let minOrbitalRadius = 150
    let maxOrbitalRadius = 300
    // $: moonRadius = maxOrbitalRadius / 4
    $: moonRadius = (maxOrbitalRadius - minOrbitalRadius) / 25 + minOrbitalRadius
    let speedFactor = 0.01

    const centerX = width / 2
    const centerY = height / 2
    let isDebugMode

    let isLoading = true

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

    onMount(() => {
        isDebugMode = window.location.hash === '#debug'
        requestId = requestAnimationFrame(animateAsteroids)

        // Data has loaded
        isLoading = false

        return () => {
            cancelAnimationFrame(requestId)
        }
    })
</script>

{#if isDebugMode}
    <Controls bind:speedFactor bind:minOrbitalRadius bind:maxOrbitalRadius />
{/if}

<div class="chart-container">
    <div class="chart-grouping">
        {#if isLoading}
            <!-- Simple Loading Spinner -->
            <span class="loader"></span>
        {:else}
            <svg {width} {height}>
                <g transform="translate({centerX}, {centerY})">
                    <MoonOrbit {moonRadius} />
                    
                    {#each asteroidData as asteroid}
                        <Asteroid {asteroid} />
                    {/each}
                </g>
            </svg>
            <Earth />
        {/if}
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
        border: 1px solid pink;
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
        font-size: .85vw;
        line-height: 130%;
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

    /* Loading animation by https://cssloaders.github.io/ */
    .loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        background: linear-gradient(0deg, rgba(235, 218, 213, 0.2) 33%, rgba(235, 218, 213, 1) 100%);
        /* background: linear-gradient(0deg, #ff3c00 33%, #ff3d00 100%); */
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    .loader::after {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #181619;
    }

    @keyframes rotation {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg)}
    } 
        
</style>
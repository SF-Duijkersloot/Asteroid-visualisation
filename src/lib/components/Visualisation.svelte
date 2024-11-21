<script>
    import { onMount } from "svelte"
    import { processAsteroidData } from "../utils/processData"

    // Components
    import Asteroids from "./Asteroids.svelte"
    import Earth from "./Earth.svelte"
    import Controls from "./Controls.svelte"
    import MoonOrbit from './MoonOrbit.svelte'
    import Legend from './Legend.svelte'

    // Props
    export let data
    const { asteroids } = data

    /*******************************
        Settings and Variables
    ********************************/
    let width = 600
    let height = width
    let minOrbitalRadius = 125
    let maxOrbitalRadius = 275
    let speedFactor = 0.01
    let isDebugMode = false
    let isLoading = true

    // Reactive variables
    $: moonRadius = (maxOrbitalRadius - minOrbitalRadius) / 25 + minOrbitalRadius
    $: asteroidData = processAsteroidData(asteroids, minOrbitalRadius, maxOrbitalRadius, speedFactor)

    /*******************************
             Animation Logic
    ********************************/
    let requestId
    const animateAsteroids = () => {
        asteroidData = asteroidData.map(asteroid => ({
            ...asteroid,
            angle: (asteroid.angle + asteroid.angularVelocity) % (2 * Math.PI),
        }))
        // Throttle animation to 60fps
        setTimeout(() => {
            requestId = requestAnimationFrame(animateAsteroids)
        }, 1000 / 60)
    }

    /*******************************
         Mounting and Unmounting
    ********************************/
    onMount(() => {
        isDebugMode = window.location.hash === '#debug'
        requestId = requestAnimationFrame(animateAsteroids)
        isLoading = false // Data has loaded

        return () => {
            cancelAnimationFrame(requestId) // Cleanup animation frame on unmount
        }
    })
</script>

{#if isDebugMode}
    <!-- Debug Controls -->
    <Controls bind:speedFactor bind:minOrbitalRadius bind:maxOrbitalRadius />
{/if}

<div class="chart-container">
    <div class="chart-grouping">
        {#if isLoading}
            <!-- Loading Spinner -->
            <span class="loader"></span>
        {:else}
            <!-- Main Chart -->
            <svg {width} {height} transform="translate({height / 2}, {width / 2})">
                    <MoonOrbit {moonRadius} />
                    <Asteroids {asteroidData} />
            </svg>
            <Earth />
            <Legend />
        {/if}
    </div>

    <!-- Asteroid Counter -->
    <div class="asteroid-counter">
        <span>&larr;</span>
        <div>    
            <h3>{asteroidData.length} asteroids</h3>
            <p>
                passed within 25 times the distance between the Earth and the Moon 
                over the past 30 days
            </p>
        </div>
    </div>
</div>

<style>
    /* Chart Styles */
    svg {
        overflow: visible;
    }

    .chart-container {
        display: flex;
        position: sticky;
        min-width: 42.5vw;
        top: 45%;
        margin-right: 7.5vw;
        transform: translateY(-50%);
        justify-content: center;
        align-items: center;
    }

    .chart-grouping {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .asteroid-counter {
        position: absolute;
        right: -12.5vw;
        display: flex;
        gap: 1em;
        font-size: 0.9vw;
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

    /* Loading Animation */
    .loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        z-index: 100;
        background: linear-gradient(0deg, rgba(235, 218, 213, 0.2) 33%, rgba(235, 218, 213, 1) 100%);
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
        100% { transform: rotate(360deg) }
    }
</style>
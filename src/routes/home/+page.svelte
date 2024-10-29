<script>
    import { onMount } from "svelte"
    import * as d3 from 'd3'

    export let data
    const { asteroids } = data
    console.log(asteroids);
    
    let width = 750
    let height = 750

    // Sort asteroids so potentially hazardous ones render last
    const sortedAsteroids = [...asteroids].sort(
        (a, b) => a.is_potentially_hazardous_asteroid - b.is_potentially_hazardous_asteroid
    )

    // Center of the visualization
    const centerX = width / 2
    const centerY = height / 2

    // Control minimum and maximum orbital radius
    let minOrbitalRadius = 150
    let maxOrbitalRadius = 300

    // Speed control factor
    let speedFactor = 0.01 // Adjust this to control overall speed (0.1 is slower, 1 is faster)

    // Scaling radius based on `miss_distance.lunar`
    const maxDistance = d3.max(asteroids, d => +d.close_approach_data[0].miss_distance.lunar)
    const orbitalRadiusScale = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([minOrbitalRadius, maxOrbitalRadius])

    // Set initial angle and scaled angular velocity for each asteroid
    $: asteroidData = sortedAsteroids.map((asteroid) => {
        const estimatedDiameterMin = +asteroid.estimated_diameter.meters.estimated_diameter_min;
        const estimatedDiameterMax = +asteroid.estimated_diameter.meters.estimated_diameter_max;

        // Calculate the average diameter
        const averageDiameter = (estimatedDiameterMin + estimatedDiameterMax) / 2;
        const scaledCircleRadius = averageDiameter / 40; // Scale down for display size

        // Calculate the orbital radius
        const orbitalRadius = orbitalRadiusScale(+asteroid.close_approach_data[0].miss_distance.lunar);

        return {
            ...asteroid,
            orbitalRadius: orbitalRadius, // Use this for positioning
            scaledCircleRadius: scaledCircleRadius, // Use this for the size of the asteroid
            angle: Math.random() * 2 * Math.PI, // Random initial angle
            angularVelocity: +asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour / 1e5 * speedFactor // Adjust speed
        };
    })

    // Animation frame setup
    let requestId
    const animateAsteroids = () => {
        asteroidData = asteroidData.map(asteroid => ({
            ...asteroid,
            angle: (asteroid.angle + asteroid.angularVelocity) % (2 * Math.PI)
        }))
        requestId = requestAnimationFrame(animateAsteroids)
    }

    onMount(() => {
        requestId = requestAnimationFrame(animateAsteroids)

        return () => {
            cancelAnimationFrame(requestId)
        }
    })
</script>

<style>
    svg {
        border: 1px solid #1b1b1b;
    }
    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: fit-content;
        width: fit-content;
        /* border: 1px solid white; */
    }
    .earth-svg {
        width: 100px;
        aspect-ratio: 1;
        position: absolute;
    }
</style>

<h1>Neo Data Visualization</h1>
<label>
    Speed Factor: <input type="range" min="0.001" max=".1" step="0.001" bind:value={speedFactor} />
</label>
<div class="chart-container">
    <svg {width} {height}>
        <g transform="translate({centerX}, {centerY})">
            <!-- Render animated asteroids -->
            {#each asteroidData as { scaledCircleRadius, angle, orbitalRadius, is_potentially_hazardous_asteroid }, index}
                <circle 
                    cx={orbitalRadius * Math.cos(angle)}
                    cy={orbitalRadius * Math.sin(angle)}
                    r={scaledCircleRadius}
                    fill={is_potentially_hazardous_asteroid ? '#CC4243' : '#DDDCDD'}
                />
            {/each}
        </g>
    </svg> 
    <svg class="earth-svg" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="111" cy="111" r="111" fill="#3E6793"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.69452 86.2937L10.3856 91.6549C11.4548 92.8768 12.3186 94.2644 12.9431 95.7632L16.6904 104.757C18.4639 109.013 22.0968 112.218 26.5415 113.446L48.6412 119.552C54.0775 121.054 58.2117 125.479 59.3419 131.004L61.4929 141.52C61.8286 143.162 61.887 144.848 61.6656 146.509L60.9634 151.775C60.3552 156.337 61.8744 160.925 65.0847 164.222L75.0005 174.406C77.2717 176.738 78.7224 179.747 79.1334 182.976L80.9391 197.164C81.5982 202.343 84.9027 206.806 89.6636 208.949L100.285 213.728C101.416 214.237 102.641 214.5 103.88 214.5H109.618C113.946 214.5 116.604 209.761 114.347 206.068C114.117 205.691 113.932 205.287 113.797 204.867L112.557 200.991C110.968 196.026 112.071 190.591 115.471 186.639L131.5 168L145.672 154.753C150.825 149.935 151.925 142.178 148.315 136.118L143.776 128.499C141.683 124.986 138.251 122.489 134.277 121.527C120.462 118.183 100.561 112.904 98.5001 110.5C97.0532 108.812 92.9893 106.312 89.0038 104.118C84.6796 101.738 79.4403 101.963 75.1546 104.412L71.1566 106.696C67.1099 109.009 62.0802 108.717 58.328 105.952C56.1738 104.365 54.6244 102.091 53.935 99.5058L53.0682 96.2556C51.8487 91.6822 47.7067 88.5 42.9735 88.5C37.5982 88.5 33.1002 84.4214 32.5758 79.0718L32.213 75.3714C31.5145 68.2471 36.1027 61.6733 43.0308 59.872L51.7646 57.6012C54.3799 56.9213 57.1584 57.7087 59.0281 59.6596C62.894 63.6937 69.6591 62.2028 71.4713 56.9174L72.3413 54.3799C73.0861 52.2075 74.6252 50.3972 76.6496 49.3128L87.5001 43.5L102.964 32.8961C104.312 31.9716 105.5 30.8329 106.481 29.5251L111.776 22.4658C112.258 21.8233 112.797 21.2264 113.389 20.6826L119.907 14.6856C122.555 12.2491 122.343 8.00688 119.464 5.84771C117.925 4.69337 115.91 4.38462 114.096 5.02493L113.85 5.11183C110.816 6.18253 107.466 4.77219 106.111 1.85428L105.316 0.143005C56.1798 2.62126 15.4682 37.0521 3.54224 83.0751C4.11258 84.2264 4.83336 85.3095 5.69452 86.2937ZM183.049 26.5583C180.506 28.0729 178.508 30.5153 177.611 33.5783L176.922 35.9349C175.759 39.9069 177.11 44.1879 180.342 46.7733L181.085 47.3677C182.012 48.1092 182.725 49.0839 183.151 50.1917C184.241 53.0261 187.103 54.7715 190.122 54.4433L193.615 54.0637C197.587 53.6319 200.759 51.2272 202.413 48.016C196.911 40.0464 190.394 32.8316 183.049 26.5583ZM210.366 61.4745C207.935 61.011 205.38 61.1469 202.931 61.9412L179.648 69.4925C176.628 70.4722 173.996 72.3853 172.132 74.9563L165.54 84.049C162.418 88.3553 161.809 93.9928 163.941 98.8658L165.926 103.402C166.958 105.761 167.366 108.346 167.109 110.907L166.587 116.129C166.21 119.902 167.276 123.678 169.57 126.698L182.116 143.205C183.992 145.674 185.057 148.664 185.164 151.764L186 176C186.778 180.447 189.568 183.844 193.144 185.657C211.072 165.942 222 139.747 222 111C222 93.2025 217.811 76.3834 210.366 61.4745Z" fill="#95C12D"/>
    </svg>
</div>

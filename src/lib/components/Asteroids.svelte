<script>
    import * as d3 from 'd3'
    import { onMount } from 'svelte'

    // Props
    export let asteroidData = [] // Array of processed asteroid data
    let asteroidGroup // Reference to SVG group containing asteroids

    // Animation and style constants
    const animationTransition = 1000

    // Calculate x,y coordinates from orbital parameters
    const calculateCoordinates = (orbitalRadius, angle) => ({
        x: orbitalRadius * Math.cos(angle),
        y: orbitalRadius * Math.sin(angle)
    })


    /*******************************************
        Render and animate asteroids using D3
    ********************************************/
    const animateAsteroids = () => {
        const asteroids = d3.select(asteroidGroup)
            .selectAll('circle')
            .data(asteroidData)

        // Update existing and add new asteroids
        asteroids.join('circle')
            // Static properties
            .attr('r', d => d.clampedRadius)
            .attr('fill', d => d.is_potentially_hazardous_asteroid 
                ? '#CC4243' 
                : '#DDDCDD'
            )
            .attr('opacity', d => d.magnitude)
            .attr('stroke', d => d.isClamped 
                ? 'orange' 
                : 'none'
            )
            .attr('stroke-width', d => d.isClamped ? 2 : 0)
            .attr('class', 'asteroid')
            .attr('data-hazardous', d => d.is_potentially_hazardous_asteroid)
            // Animate position
            .transition()
            .duration(animationTransition)
            .ease(d3.easeLinear)
            .attr('cx', d => calculateCoordinates(d.orbitalRadius, d.angle).x)
            .attr('cy', d => calculateCoordinates(d.orbitalRadius, d.angle).y)
    }

    // Initialize animation on component mount
    onMount(() => {
        if (asteroidData.length > 0) {
            animateAsteroids()
        }
    })

    // Trigger animation when asteroid data changes
    $: if (asteroidData.length > 0) {
        animateAsteroids()
    }
</script>

<g bind:this={asteroidGroup} class="asteroid-group">
    <circle /> <!-- D3 will dynamically insert asteroids here -->
</g>

<style>
    .asteroid-group {
        overflow: visible;
    }
</style>
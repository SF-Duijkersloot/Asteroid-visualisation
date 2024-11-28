<script>
    import * as d3 from 'd3'
    import { onMount } from 'svelte'

    export let asteroidData = [] // Array of asteroid data

    /*******************************
     Render Asteroids and Animation
    ********************************/
    const animateAsteroids = () => {
        d3.select('.asteroid-group')
            .selectAll('circle')
            .data(asteroidData)
            .join('circle')
            // Set static attributes
            .attr('class', 'asteroid')
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
            .attr('stroke-width', d => d.isClamped 
                ? 2 
                : 0
            )
            // Animate orbital motion
            .each(function (d) {
                const animateOrbit = () => {
                    d3.select(this)
                        .transition('animate-orbit')
                        .duration(d.duration)
                        .ease(d3.easeLinear)
                        .attrTween('transform', () => {
                            const orbitalRadius = d.orbitalRadius
                            return progress => { // Progress is from 0 to 1
                                const angle = progress * 2 * Math.PI
                                const x = orbitalRadius * Math.cos(angle)
                                const y = orbitalRadius * Math.sin(angle)
                                return `translate(${x},${y})`
                            }
                        })
                        .on('end', animateOrbit) // Repeat animation
                }

                animateOrbit()
            })
    }

    onMount(() => {
        if (asteroidData.length > 0) {
            animateAsteroids()
        }
    })

    // Only trigger animation when data initially loads or changes
    $: if (asteroidData.length > 0) {
        animateAsteroids()
    }
</script>

<g class="asteroid-group">
    <circle /> <!-- D3 will dynamically insert asteroids here -->
</g>

<style>
    g {
        overflow: visible;
    }
</style>
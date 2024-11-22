<script>
    import * as d3 from 'd3'
    import { onMount } from 'svelte'

    export let asteroidData = []

    const animateAsteroids = () => {
        const asteroids = d3.select('.asteroid-group')
            .selectAll('circle')
            .data(asteroidData)
            .join('circle')
            // Set attributes
            .attr('class', 'asteroid')
            .attr('r', d => d.clampedRadius)
            .attr('fill', d => d.is_potentially_hazardous_asteroid ? '#CC4243' : '#DDDCDD')
            .attr('opacity', d => d.magnitude)
            .attr('stroke', d => d.isClamped ? 'orange' : 'none')
            .attr('stroke-width', d => d.isClamped ? 2 : 0)
            .attr('data-hazardous', d => d.is_potentially_hazardous_asteroid)
            // Start at beginning of path
            .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
            // Start the orbital animation
            .each(function(d) {
                const node = d3.select(this)
                function rotate() {
                    node.transition('rotate')
                        .duration(d.duration)
                        .ease(d3.easeLinear)
                        .attrTween('transform', function() {
                            return function(t) {
                                const angle = t * 2 * Math.PI
                                const x = d.orbitalRadius * Math.cos(angle)
                                const y = d.orbitalRadius * Math.sin(angle)
                                return `translate(${x},${y})`
                            }
                        })
                        .on('end', rotate) // Make it continuous
                }
                rotate()
            })

        // Remove old elements
        asteroids.exit().remove()
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
    <circle />
    <!-- D3 will insert asteroid groups here -->
</g>

<style>
    g {
        overflow: visible;
    }
</style>
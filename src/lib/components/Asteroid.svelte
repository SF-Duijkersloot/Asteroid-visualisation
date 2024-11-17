<script>
    import * as d3 from 'd3'
    import { onMount } from 'svelte';
    export let asteroid

    $: ({ clampedRadius, angle, orbitalRadius, is_potentially_hazardous_asteroid, isClamped, magnetude } = asteroid)

    $: cx = orbitalRadius * Math.cos(angle)
    $: cy = orbitalRadius * Math.sin(angle)

    let circleElement

    onMount(() => {
        d3.select(circleElement)
            .datum(asteroid)
    })
</script>

<circle 
    bind:this = { circleElement }
    cx = { cx }
    cy = { cy }
    r = { clampedRadius }
    fill = { is_potentially_hazardous_asteroid ? '#CC4243' : '#DDDCDD' }
    opacity = { magnetude }
    stroke = { isClamped ? 'orange' : 'none' }
    stroke-width = { isClamped ? 2 : 0 }
    class = "asteroid"
    data-hazardous = { is_potentially_hazardous_asteroid }
/>

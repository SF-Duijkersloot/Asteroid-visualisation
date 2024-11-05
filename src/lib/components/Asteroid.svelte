<script>
    import * as d3 from 'd3'
    import { onMount } from 'svelte';
    export let asteroid

    $: ({ scaledCircleRadius, angle, orbitalRadius, is_potentially_hazardous_asteroid } = asteroid)

    $: cx = orbitalRadius * Math.cos(angle)
    $: cy = orbitalRadius * Math.sin(angle)

    let circleElement

    onMount(() => {
        d3.select(circleElement)
            .datum(asteroid)
    })
</script>

<circle 
    bind:this={circleElement}
    {cx}
    {cy}
    r={scaledCircleRadius}
    fill={is_potentially_hazardous_asteroid ? '#CC4243' : '#DDDCDD'}
    class="asteroid"
/>

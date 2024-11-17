<script>
    export let moonRadius
</script>

<circle
    class = "moon-orbit"
    cx = "0"
    cy = "0"
    r = { moonRadius }
    stroke = "white"
    opacity = "0.5"
    stroke-width = "1"
    fill = "none"
    stroke-dasharray = "10 10"
/>

<text
    x = "0"
    y = { - moonRadius - 10 } 
    text-anchor = "middle"
    fill = "white"
    opacity = "0.5"
    font-size = "12"
>
    Moon Orbit
</text>
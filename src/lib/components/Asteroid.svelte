<script>
    export let asteroid;

    $: ({ scaledCircleRadius, angle, orbitalRadius, is_potentially_hazardous_asteroid } = asteroid);

    $: cx = orbitalRadius * Math.cos(angle);
    $: cy = orbitalRadius * Math.sin(angle);
</script>

<circle 
    {cx}
    {cy}
    r={scaledCircleRadius}
    fill={is_potentially_hazardous_asteroid ? '#CC4243' : '#DDDCDD'}
    class="asteroid"
    data-hazardous="{is_potentially_hazardous_asteroid}"
/>

<script>
    import * as d3 from 'd3';

    export let data;
    let width = 600;
    let height = 300;
    let margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const { asteroids } = data;

    // Sort asteroids array to render potentially hazardous asteroids last
    const sortedAsteroids = [...asteroids].sort(
        (a, b) => a.is_potentially_hazardous_asteroid - b.is_potentially_hazardous_asteroid
    );

    // Set up scales
    $: xScale = d3.scaleLinear()
        .domain([0, d3.max(asteroids, d => +d.close_approach_data[0].miss_distance.lunar)])
        .range([0, width - margin.left - margin.right]);

    $: yScale = d3.scaleLinear()
        .domain([0, d3.max(asteroids, d => +d.close_approach_data[0].relative_velocity.kilometers_per_second)])
        .range([height - margin.top - margin.bottom, 0]);

</script>

<style>
    svg {
        border: 1px solid #1b1b1b;
    }
</style>

<h1>Neo data</h1>
<div class="chart-container" bind:clientWidth={width}>
    <svg {width} {height}>
        <g transform="translate({margin.left}, {margin.top})">
            {#each sortedAsteroids as asteroid, index}
                <circle 
                    id={"asteroid-" + index}
                    cx={xScale(+asteroid.close_approach_data[0].miss_distance.lunar)} 
                    cy={yScale(+asteroid.close_approach_data[0].relative_velocity.kilometers_per_second)} 
                    r={10} 
                    fill={asteroid.is_potentially_hazardous_asteroid ? 'red' : '#2f2f2f'}
                />
            {/each}
        </g>
    </svg>    
</div>

<div>
    <h2>Asteroid list</h2>
    <h3>List length: {asteroids.length}</h3>
    <ul>
    {#each asteroids as asteroid}
        <li>
            <p>{asteroid.name}</p>
        </li>
    {/each}
    </ul>
</div>


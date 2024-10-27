<script>
    import * as d3 from 'd3';

    export let data;
    let width = 750;
    let height = 750;  // Square layout for circular visualization
    let margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const { asteroids } = data;
    console.log(asteroids);
    

    // Sort asteroids so potentially hazardous ones render last
    const sortedAsteroids = [...asteroids].sort(
        (a, b) => a.is_potentially_hazardous_asteroid - b.is_potentially_hazardous_asteroid
    );
    // Center of the visualization
    const centerX = width / 2;
    const centerY = height / 2;

    // Control minimum and maximum radius
    let minRadius = 200; // Minimum radius from the center for closest asteroids
    let maxRadius = 300; // Maximum radius for farthest asteroids

    // Scaling radius based on `miss_distance.lunar`
    const maxDistance = d3.max(asteroids, d => +d.close_approach_data[0].miss_distance.lunar);
    const radiusScale = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([minRadius, maxRadius]);

    // Angle step to distribute asteroids evenly around the circle
    const angleStep = (2 * Math.PI) / sortedAsteroids.length;
</script>

<style>
    svg {
        border: 1px solid #1b1b1b4b;
    }
    .earth {
        fill: #1e90ff;
        stroke: #003366;
        stroke-width: 2;
    }
</style>

<h1>Neo Data Visualization</h1>
<div class="chart-container">
    <svg {width} {height}>
        <g transform="translate({centerX}, {centerY})"> <!-- Center the visualization -->
            <!-- Earth representation in the center -->
            <circle cx="0" cy="0" r="20" class="earth" />

            <!-- Render asteroids -->
            {#each sortedAsteroids as asteroid, index}
                <circle 
                    cx={radiusScale(+asteroid.close_approach_data[0].miss_distance.lunar) * Math.cos(index * angleStep)}
                    cy={radiusScale(+asteroid.close_approach_data[0].miss_distance.lunar) * Math.sin(index * angleStep)}
                    r={10}
                    fill={asteroid.is_potentially_hazardous_asteroid ? 'red' : '#2f2f2f'}
                />
            {/each}
        </g>
    </svg>    
</div>

<div>
    <h2>Asteroid List</h2>
    <h3>List length: {asteroids.length}</h3>
    <ul>
    {#each asteroids as asteroid}
        <li>
            <p>{asteroid.name}</p>
        </li>
    {/each}
    </ul>
</div>

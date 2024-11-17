<script>
    import Visualization from "$lib/components/Visualisation.svelte"
    export let data
</script>

<main>
    <article class="content">
        <h1>A Month of Asteroids</h1>
        <h2>Visualizing the Past Month's Closest Encounters With Asteroids</h2>
    
        <p>In the past month, Earth has experienced multiple close encounters with asteroids. While these objects don't pose an immediate threat, they offer a fascinating glimpse into the dynamics of our solar system. This visualization brings those encounters to life by showing the paths, sizes, and speeds of these asteroids.</p>
    
        <h3>Close Encounters</h3>
        <p>Each year, Earth is visited by numerous asteroids, some of which come alarmingly close. While these encounters are rarely dangerous, they highlight the unpredictability of space. The Moon's orbit serves as a reference for understanding the proximity of these objects.</p>
    
        <h3>Potentially Hazardous Asteroids</h3>
        <p>Among these frequent visitors, a small number of asteroids are considered potentially hazardous. A Potentially Hazardous Asteroid (PHA) is one that passes within 20 times the distance of the Earth and the moon (about 7.5 million kilometers) and has a brightness (magnitude) of 22 or higher, indicating it's large enough to pose a risk. Other factors, such as size, speed, and trajectory, are also considered to assess the potential danger.</p>
    
        <h3>Scatterplot</h3>
        <p>A more detailed understanding of asteroid impacts can be gained by examining the relationship between their size and their proximity to Earth. A scatterplot, for instance, could reveal which large asteroids are passing closest to our planet and which smaller ones come within similar ranges. This kind of analysis helps us understand the patterns of close encounters and gives us insight into the forces shaping the orbits of these cosmic travelers.</p>
    
        <h3>Conclusion</h3>
        <p>Though the risk of a catastrophic asteroid impact is low, the number of near-misses serves as a reminder of the forces at play in our solar system. Each asteroid that passes near Earth offers a glimpse into the dynamic, chaotic nature of the universe. While Earth remains mostly safe, these encounters remind us of the need to monitor and understand the paths of these wandering celestial bodies, not just for today, but for future generations.</p>
    </article>

    <Visualization {data} />
</main>


<style>

    @font-face {
        font-family: 'Space Grotesk';
        src: url('/SpaceGrotesk-Bold.woff2') format('woff2');
        font-weight: bold;
    }

    @font-face {
        font-family: 'Space Grotesk';
        src: url('/SpaceGrotesk-Regular.woff2') format('woff2');
        font-weight: normal;
    }

    * {
        font-family: inter;
    }

    main {
        display: flex;
        gap: 2em;
        justify-content: space-between;
        align-items: start;
        width: 80vw;
        /* height: 200vh; */
        justify-self: center;
    }

    article {
        /* border: 1px solid white; */
        width: 20vw;
        color: white;
    }

    h1 {
        font-family: Space Grotesk;
        font-weight: bold;
        font-size: 3.4vw;
        text-transform: uppercase;
        text-align: center;
        /* margin-bottom: 0; */
    }

    h2 {
        font-family: Space Grotesk;
        font-weight: lighter;
        font-size: 1.1vw;
        text-align: center;
        line-height: 150%;
    }

    h3 {

    }

    p {
        font-size: 1.1vw;
        /* font-size: 1em; */
        font-weight: 200;
        line-height: 150%;
    }
</style>
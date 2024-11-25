<script>
    // Props
    export let data
    const { asteroids } = data

    // Calculations
    const withinMoonOrbit = asteroids.filter(
        asteroid => asteroid.close_approach_data[0].miss_distance.lunar <= 1
    ).length
</script>

<article>
    <h1>A Month of Asteroids</h1>
    <h2>Visualizing the Past Month's Closest Encounters With Asteroids</h2>

    <!-- Introduction -->
    <p>
        In the past month, Earth has had several close encounters with asteroids. 
        These space rocks may not pose an immediate threat, but they give us a 
        fascinating look at how our solar system works. This visualization shows 
        their paths, sizes, and speeds, helping us understand how close some of 
        them came and what risks they might bring.
        <span><i>Scroll down to learn more</i> &darr;</span>
    </p>

    <!-- Content Sections -->
    <section>
        <h3 class="close-encounters">Close Encounters</h3>
        <p>
            Every year, many asteroids pass by Earth—some coming surprisingly close. 
            Most of the time, they aren't dangerous, but they remind us how unpredictable 
            space can be. The Moon's orbit is a useful way to measure just how near these 
            asteroids come, because this month there were <b>{withinMoonOrbit}</b> asteroids 
            that came closer to us than the moon
        </p>
    </section>

    <section>
        <h3>Potentially Hazardous Asteroids</h3>
        <p>
            Some asteroids are considered more dangerous than others. These are called 
            Potentially Hazardous Asteroids (PHAs). They pass within 20 times the distance 
            between Earth and the Moon (about 7.5 million kilometers) and are big enough 
            to be a concern. Scientists also look at their speed and direction to figure 
            out how risky they might be.
        </p>
    </section>

    <section>
        <h3>What Patterns Can We See?</h3>
        <p>
            By looking at the size, speed, and distance of these asteroids, we can start 
            to notice patterns. For example, smaller asteroids sometimes come closer than 
            bigger ones. These details help us better understand how asteroids move and 
            what makes them behave the way they do.
        </p>
    </section>

    <section>
        <h3>Conclusion</h3>
        <p>
            This visualization gives us a small window into the activity of our solar system. 
            The asteroids near Earth are constantly moving, each with its own unique path. 
            Even though most of them are harmless, they remind us why scientists keep a close 
            eye on them—to make sure we're prepared for anything that might come our way in 
            the future.
        </p>
    </section>
</article>

<style>
    /* Layout */
    article {
        margin-top: 10vw;
        width: 20vw;
        height: 170vw;
        color: white;
    }

    /* Typography */
    h1 {
        font-family: Space Grotesk;
        font-size: 3.4vw;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        margin: 0 0 1.25em 0;
    }

    h2 {
        font-family: Space Grotesk;
        font-size: 1.1vw;
        font-weight: lighter;
        text-align: center;
        line-height: 150%;
        margin-bottom: 3.5em;
    }

    h3 {
        font-size: 1.2vw;
        font-weight: 500;
        margin: 6.5em 0 1.5em 0;
    }

    p {
        font-size: 1.1vw;
        font-weight: 200;
        line-height: 150%;
    }

    p span {
        display: block;
        font-size: 1vw;
        font-weight: 400;
        margin-top: 2em;
    }
</style>
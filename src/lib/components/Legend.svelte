<script>
    import { onMount } from 'svelte'
    
    /*******************************
           Scroll to Section
    ********************************/
    onMount (() => {
        const hazardousAsteroid = document.querySelector('.legend-item.hazardous-asteroid')
        const moonOrbit = document.querySelector('.legend-item.moon-orbit')

        // Global function to scroll to a section
        const scrollIntoView = (selector, offset) => {
            const rect = document.querySelector(selector).getBoundingClientRect()

            window.scrollTo({
                behavior: 'smooth',
                top: window.scrollY + rect.top - (window.innerHeight / 2) + offset,
            })
        }

        // Add eventlisteners for the legend items
        hazardousAsteroid.addEventListener('click', () => {
            scrollIntoView('.hazardous-asteroids.observer-section', 200)
        })

        moonOrbit.addEventListener('click', () => {
            scrollIntoView('.close-encounters.observer-section', 200)
        })
    })
</script>


<div class="legend-container">
    <div class="legend">
        <!-- Asteroid Sizes -->
        <div class="legend-item asteroid-size">
            <h4>Asteroid Size</h4>
            
            <span></span>
            <p>200 m</p>
            <span></span>
            <p>50 m</p>
 
            <h5>Scaled x25.000 from real size</h5>
        </div>
 
        <!-- Hazardous Asteroid -->
        <div class="legend-item hazardous-asteroid">
            <span></span>
            <p>Potentially Hazardous Asteroid</p>
        </div>
 
        <!-- Moon Orbit -->
        <div class="legend-item moon-orbit">
            <span></span>
            <p>Moons Orbit</p>
        </div>
    </div>
 </div>
 
 <style>
    .legend-container {
        position: absolute;
        bottom: -7.5vw;
        background-color: rgba(241, 239, 237, 0.9);
        padding: 2.5em 2em 1.75em 2em;
        border-radius: .75vw;
        font-size: .75vw;
    }
 
    .legend {
        display: flex;
        gap: 3em;
    }
 
    .legend-item {
        position: relative;
        display: flex;
        gap: 1em;
        align-items: center;
    }
 
    h4 {
        font-size: 1.1em;
        font-weight: 400;
        position: absolute;
        top: -1.5em;
        margin: 0;
    }
 
    h5 {
        font-size: .9em;
        font-weight: 300;
        position: absolute;
        bottom: -1.5em;
        margin: 0;
        text-wrap: nowrap;
    }
 
    p {
        font-size: 1em;
        font-weight: 300;
        text-wrap: nowrap;
    }
 
    span {
        width: 2em;
        aspect-ratio: 1;
        border-radius: 100%;
    }
 
    .asteroid-size span {
        background-color: #3C3C3B;
    }
 
    .asteroid-size span:nth-of-type(2) {
        width: 1.25em;
    }
 
    .hazardous-asteroid span {
        background-color: #CC4243;
    }
 
    .moon-orbit span {
        border: .15em dashed #8B8A8C;
    }

    .hazardous-asteroid, 
    .moon-orbit {
        cursor: pointer;
    }
 </style>
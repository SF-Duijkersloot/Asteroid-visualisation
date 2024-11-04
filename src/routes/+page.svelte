<script>
    import Visualization from "$lib/components/Visualisation.svelte"
    
    export let data
</script>

<h1>Asteroid Visualization</h1>
<div class="visualisation-container">
    <article>
        <h2>Interesting Title</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptatem totam nobis neque alias asperiores, assumenda quia culpa, nam recusandae a iusto? Accusantium recusandae maiores repudiandae sit distinctio quas eveniet.</p>    
        <p class="dangerous-asteroid">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptatem totam nobis neque alias asperiores, assumenda quia culpa, nam recusandae a iusto? Accusantium recusandae maiores repudiandae sit distinctio quas eveniet.</p>    
    </article>

    <Visualization {data} />
</div>


<style>
    h1 {
        color: white;
        text-align: center;
    }

    .visualisation-container {
        display: flex;
        gap: 2em;
        justify-content: space-between;
        align-items: start;
        height: 200vh;
        /* border: 1px solid pink; */
        color: white;
    }

    article {
        /* width: 50%; */
        /* border: 1px solid blue; */
    }

    .dangerous-asteroid {
        margin-top: 35em;
    }
    article h2 {
        font-size: 6vw;
    }
</style>
<script>
    import Visualization from "$lib/components/Visualisation.svelte"
    export let data
</script>

<div class="visualisation-container">
    <article>
        <h1>Interesting Title</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptatem totam nobis neque alias asperiores, assumenda quia culpa, nam recusandae a iusto? Accusantium recusandae maiores repudiandae sit distinctio quas eveniet.</p>    
        <p class="dangerous-asteroid">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptatem totam nobis neque alias asperiores, assumenda quia culpa, nam recusandae a iusto? Accusantium recusandae maiores repudiandae sit distinctio quas eveniet.</p>    
    </article>

    <Visualization {data} />
</div>


<style>

    * {
        font-family: inter;
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

    article h1 {
        font-family: inter;
        font-size: 6vw;
    }

    article {
        /* border: 1px solid white; */
        height: 350vh;
    }

    .dangerous-asteroid {
        margin-top: 50em;
    }
</style>
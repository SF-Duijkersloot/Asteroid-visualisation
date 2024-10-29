<script>
    import Visualization from "$lib/components/Visualisation.svelte"
    
    export let data
</script>

<h1>Asteroid Visualization</h1>

<Visualization {data} />


<style>
    h1 {
        color: white;
        text-align: center;
    }
</style>
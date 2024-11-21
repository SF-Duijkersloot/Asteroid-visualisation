<script>
    import Visualization from "$lib/components/Visualisation.svelte"
    import BodyContent from "$lib/components/BodyContent.svelte"

    export let data
</script>

<main>
    <BodyContent { data } />

    <Visualization { data } />
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
        justify-self: center;
    }
</style>
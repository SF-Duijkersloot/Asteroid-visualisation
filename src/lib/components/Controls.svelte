<script>
    export let speedFactor
    export let minOrbitalRadius
    export let maxOrbitalRadius
</script>

<div class="label-container">
    <label>
        Speed Factor:
        <input type="range" min="0.001" max="0.05" step="0.001" bind:value={speedFactor} />
    </label>
    <label>
        minOrbitalRadius:
        <input type="range" min="1" max="500" step="1" bind:value={minOrbitalRadius} />
    </label>
    <label>
        maxOrbitalRadius:
        <input type="range" min="1" max="500" step="1" bind:value={maxOrbitalRadius} />
    </label>
</div>

<style>
    .label-container {
        position: fixed;
        top: 2em;
        right: 2em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        color: white;
    }
</style>
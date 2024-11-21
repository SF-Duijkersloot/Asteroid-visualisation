<script>
    // Props
    export let speedFactor
    export let minOrbitalRadius
    export let maxOrbitalRadius

    // Input ranges
    const speedRange = {
        min: 0.001,
        max: 0.05,
        step: 0.001
    }

    const radiusRange = {
        min: 1,
        max: 500,
        step: 1
    }
</script>

<!-- Controls -->
<div class="label-container">
    <label>
        Speed Factor:
        <input 
            type="range" 
            bind:value={speedFactor}
            min={speedRange.min}
            max={speedRange.max}
            step={speedRange.step} 
        />
    </label>

    <label>
        minOrbitalRadius:
        <input 
            type="range" 
            bind:value={minOrbitalRadius}
            min={radiusRange.min}
            max={radiusRange.max}
            step={radiusRange.step} 
        />
    </label>

    <label>
        maxOrbitalRadius:
        <input 
            type="range" 
            bind:value={maxOrbitalRadius}
            min={radiusRange.min}
            max={radiusRange.max}
            step={radiusRange.step} 
        />
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
        z-index: 999;
    }
</style>
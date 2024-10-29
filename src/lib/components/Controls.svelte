<script>
    export let speedFactor;
</script>

<label>
    Speed Factor:
    <input type="range" min="0.001" max="0.1" step="0.001" bind:value={speedFactor} />
</label>

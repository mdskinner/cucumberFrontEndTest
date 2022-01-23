<script lang="ts">
    import { searchString } from '_stores/ui'
</script>

<style lang="scss">
    input {
        position: absolute;
        z-index: 1;
        padding: 0.7rem 1.2rem;
        border: 1px solid #444;
        font-size: 1.5rem;
        width: 20rem;
        top: -4rem;
        left: 50%;
        transform: translate(-19.3rem, 0);

        @media (max-width: 62.5em /* bp1000 */) {
            font-size: 1.5rem;
            width: calc(100% - 6rem);
            max-width: 38rem;
            top: 0.75rem;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
</style>

<input type="text" bind:value={$searchString} placeholder="search" />

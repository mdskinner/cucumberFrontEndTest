<script lang="ts">
    import { filters } from 'modules/people/store'

    import FilterIcon from '_icons/filter-solid.svelte'
    import CloseButton from '_icons/times-circle-solid.svelte'

    export let data: IPerson[]

    let showFilters = false

    let dataPoints = {
        gender: [...new Set(data.map((p) => p.gender))].sort(),
        eye_color: [...new Set(data.map((p) => p.eye_color))].sort(),
        hair_color: [...new Set(data.map((p) => p.hair_color))].sort(),
        skin_color: [...new Set(data.map((p) => p.skin_color))].sort(),
    }
</script>

<style lang="scss">
    b.toggleFilters {
        position: fixed;
        right: 0;
        top: 10.5rem;
        background: #ffe820bd;
        padding: 0.5rem 0.5rem 0.3rem;
        border-radius: 0.3rem 0 0 0.3rem;
        box-shadow: 0 0 0.3rem 0 #000;
        transition: padding 0.5s 1 ease-in-out;
        cursor: pointer;
        z-index: 15;

        @media (max-width: 62.5em /* bp1000 */) {
            top: 15rem;
        }

        span {
            font-weight: 600;
            padding: 0 0.5rem;
            transform: translate(0, -0.4rem);
            display: inline-block;
            color: #444;
        }

        &:hover {
            padding: 0.5rem 1.5rem 0.3rem 0.5rem;

            :global(svg path) {
                fill: var(--color-secondary);
            }
        }
    }
    section {
        position: fixed;
        background: var(--color);
        z-index: 5;
        left: 150%;
        top: 50%;
        padding: 1rem 2rem;
        border-radius: 0.3rem;
        box-shadow: 0.1rem 0.1rem 0.3rem 0 #000;
        transition: left 1.2s 1 ease-in-out;
        transform: translate(-50%, -50%);

        &.showFilters {
            left: 50%;
        }

        b {
            float: right;
            transform: translate(1.5rem, -0.5rem);

            :global(svg) {
                width: 1.5rem;
            }
        }
    }
</style>

<b class="toggleFilters" on:click={() => (showFilters = !showFilters)}>
    <FilterIcon />
    {#if showFilters}<span>HIDE FILTERS</span>{/if}
</b>

{#if dataPoints}
    <section class:showFilters>
        <b on:click={() => (showFilters = false)}>
            <CloseButton />
        </b>

        <h3>Filters</h3>

        {#each Object.keys(dataPoints) as key}
            <label>
                {key}

                <select name={key} bind:value={$filters[key]}>
                    <option value={null}>all</option>

                    {#each dataPoints[key] as val}
                        <option value={val}>{val}</option>
                    {/each}
                </select>
            </label>
        {/each}
    </section>
{/if}

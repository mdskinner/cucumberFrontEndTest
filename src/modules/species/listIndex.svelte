<script lang="ts">
    import { onDestroy } from 'svelte'

    import api from '_config/api'

    import { searchString, page, take } from '_stores/ui'
    import { planets } from 'modules/planets/store'
    import { speciesCollection } from 'modules/species/store'

    import Search from 'components/search.svelte'
    import Pagination from 'components/pagination.svelte'

    import SpeciesListItem from 'modules/species/listItem.svelte'

    let getPlanets = async () => ($planets = await api.Planets.collection())
    let getSpecies = async () => ($speciesCollection = await api.Species.collection())

    $: if (!$planets) getPlanets()
    $: if (!$speciesCollection) getSpecies()

    $: data = $speciesCollection?.filter((i) => {
        return $searchString ? i.name.toLowerCase().indexOf($searchString.toLowerCase()) > -1 : true
    })

    $: paginatedData = (() => {
        return data?.slice($page * $take, ($page + 1) * $take)
    })()

    $: if ($searchString) $page = 0

    onDestroy(() => {
        $searchString = null
        $page = 0
    })
</script>

<style lang="scss">
    section {
        display: grid;
        justify-items: center;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        grid-gap: 0.5rem;
        margin-bottom: 0.5rem;

        @media (max-width: 62.5em /* bp1000 */) {
            margin-top: 4.3rem;
        }

        :global(h3) {
            color: #555;
            margin: 0.25rem 0;
        }
        :global(h3 span) {
            background: white;
            color: #000;
            padding: 0.5rem 1rem;
            font-weight: 300;
            border-radius: 0.5rem;
            transform: translate(0, -0.2rem);
            float: right;

            &::first-letter {
                text-transform: uppercase;
            }
        }

        div {
            h2 {
                margin: 3rem 0 0.5rem;
            }
        }
    }
</style>

{#if $speciesCollection && $planets}
    <Search />

    <section>
        {#each paginatedData as item}
            <SpeciesListItem species={item} />
        {:else}
            <div>
                <h2>We can't find any more with that search.</h2>
                <p>Please try searching for something else.</p>
            </div>
        {/each}
    </section>

    <Pagination total={data.length} />
{:else}
    <h2>Loading species...</h2>
{/if}

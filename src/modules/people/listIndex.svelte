<script lang="ts">
    import { onDestroy } from 'svelte'
    import _ from 'lodash'

    import api from '_config/api'

    import { searchString, page, take } from '_stores/ui'
    import { removeNullValues } from '_helpers/object'

    import { people, filters } from 'modules/people/store'
    import { planets } from 'modules/planets/store'
    import { speciesCollection } from 'modules/species/store'

    import Search from 'components/search.svelte'
    import Pagination from 'components/pagination.svelte'

    import Filters from 'modules/people/filters.svelte'
    import SelectionData from 'modules/people/selectionData.svelte'
    import PersonListItem from 'modules/people/listItem.svelte'

    let getPeople = async () => ($people = await api.People.collection())
    let getPlanets = async () => {
        $planets = await api.Planets.collection()
    }
    let getSpecies = async () => ($speciesCollection = await api.Species.collection())

    $: if (!$people) getPeople()
    $: if (!$planets) getPlanets()
    $: if (!$speciesCollection) getSpecies()

    $: data = $people?.filter(i => {
        let filterValues = removeNullValues($filters)

        if (!_.isMatch(i, filterValues)) return false

        return $searchString ? i.name.toLowerCase().indexOf($searchString.toLowerCase()) > -1 : true
    })

    $: paginatedData = (() => {
        return data?.slice($page * $take, ($page + 1) * $take)
    })()

    $: if ($searchString) $page = 0
    $: if ($filters) $page = 0

    onDestroy(() => {
        $searchString = null
        $page = 0
    })
</script>

{#if $people && $planets && $speciesCollection}
    <Search />
    <Filters data={$people} />
    <SelectionData />

    <section>
        {#each paginatedData as item}
            <PersonListItem character={item} />
        {:else}
            <div>
                <h2>We can't find any more with those filters.</h2>
                <p>Please try searching for something else or reduce your filters.</p>
            </div>
        {/each}
    </section>

    <b>
        <Pagination total={data.length} />
    </b>
{:else}
    <h2>Loading characters...</h2>
{/if}

<style lang="scss">
    section {
        display: grid;
        justify-items: center;
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
        grid-gap: 0.5rem;
        margin-bottom: 6.5rem;

        @media (max-width: 62.5em /* bp1000 */) {
            margin-top: 4.3rem;
        }
        @media (max-width: 37.5em /* bp600 */) {
            grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
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
            transform: translate(1rem, -0.2rem);
            float: right;

            @media (max-width: 37.5em /* bp600 */) {
                transform: translate(0, -0.2rem);
            }

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
    b {
        transform: translate(0, -6rem);
        display: block;
    }
</style>

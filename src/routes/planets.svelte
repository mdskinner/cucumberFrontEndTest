<script lang="ts">
    import { stores } from '@sapper/app'

    import PlanetIndex from 'modules/planets/listIndex.svelte'
    import PlanetDetail from 'modules/planets/detail.svelte'

    const { page } = stores()
</script>

<svelte:head>
    <title>Planets | Starwars Directory</title>
</svelte:head>

{#if $page.query.id}
    <PlanetDetail />
{:else}
    <PlanetIndex />
{/if}

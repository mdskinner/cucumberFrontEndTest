<script lang="ts">
    import { stores } from '@sapper/app'

    import SpeciesIndex from 'modules/species/listIndex.svelte'
    import SpeciesDetail from 'modules/species/detail.svelte'

    const { page } = stores()
</script>

<svelte:head>
    <title>Species | Starwars Directory</title>
</svelte:head>

{#if $page.query.id}
    <SpeciesDetail />
{:else}
    <SpeciesIndex />
{/if}

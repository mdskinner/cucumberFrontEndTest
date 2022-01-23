<script lang="ts">
    import { stores } from '@sapper/app'

    import PersonIndex from 'modules/people/listIndex.svelte'
    import PersonDetail from 'modules/people/detail.svelte'

    const { page } = stores()
</script>

<svelte:head>
    <title>People | Starwars Directory</title>
</svelte:head>

{#if $page.query.id}
    <PersonDetail />
{:else}
    <PersonIndex />
{/if}

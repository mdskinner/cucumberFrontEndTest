<script lang="ts">
    import { onMount } from 'svelte'

    import api from '_config/api'

    import { speciesCollection } from 'modules/species/store'

    export let speciesUrl: string
    let species: ISpecies

    onMount(async () => {
        if (!speciesUrl) return
        species = $speciesCollection?.find((s) => s.url == speciesUrl) || (await getData())
    })

    let getData = async () => await api.Species.item(speciesUrl.split('/')[2])
</script>

<style lang="scss">
    //
</style>

{#if species}
    <h3>species: <span><a href={`species${species.url && `?id=${species.url.split('/')[2]}`}`}>{species.name || 'Unknown'}</a></span></h3>
{:else}
    <p>Checking species...</p>
{/if}

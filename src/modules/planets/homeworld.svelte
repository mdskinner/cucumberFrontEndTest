<script lang="ts">
    import { onMount } from 'svelte'

    import api from '_config/api'

    import { planets } from 'modules/planets/store'

    export let homeworld: string
    let planet: IPlanet

    onMount(async () => {
        if (!homeworld) return
        if (!$planets) await getData()

        planet = $planets?.find(p => p.url == homeworld)
    })

    let getData = async () => await api.Planets.item(homeworld.split('/')[2])
</script>

{#if planet}
    <h3>homeworld: <span><a href={`planets${planet.url && `?id=${planet.url.split('/')[2]}`}`}>{planet.name || 'Unknown'}</a></span></h3>
{:else}
    <p>Checking planets...</p>
{/if}

<style lang="scss">
    //
</style>

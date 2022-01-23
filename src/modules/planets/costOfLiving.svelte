<script lang="ts">
    import { onMount } from 'svelte'

    import api from '_config/api'

    import { numberFormat } from '_helpers/numbers'
    import { planets } from 'modules/planets/store'

    export let homeworld: string
    let planet: IPlanet
    let feesPerDay: string

    $: if ($planets) planet = $planets.find((p) => p.url == homeworld)

    $: if (planet) {
        let feesSplit = planet.fees_per_day.split('.')
        feesPerDay = (feesSplit.length == 1 && numberFormat(feesSplit[0])) || `${numberFormat(feesSplit[0])}.${feesSplit[1]}`
    }

    onMount(async () => {
        if (!homeworld) return
        planet = $planets?.find((p) => p.url == homeworld) || (await getData())
    })

    let getData = async () => await api.Planets.item(homeworld.split('/')[2])
</script>

<style lang="scss">
    //
</style>

{#if planet}
    <h3>living cost: <span>{feesPerDay} / day</span></h3>
{:else}
    <p>Checking planets...</p>
{/if}

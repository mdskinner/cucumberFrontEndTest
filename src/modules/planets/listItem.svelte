<script lang="ts">
    import { goto } from '@sapper/app'
    import { handleImgError } from '_helpers/errorHandlers'
    import { numberFormat } from '_helpers/numbers'

    export let homeworld: IPlanet
</script>

{#if homeworld}
    <div>
        <img src={homeworld.image || 'image-placeholder.png'} on:error={handleImgError} alt="avatar" />

        <b>
            <h3>planet: <span>{homeworld.name}</span></h3>
            <h3>orbital period: <span>{homeworld.orbital_period}</span></h3>
            <h3>population: <span>{numberFormat(homeworld.population)}</span></h3>
        </b>

        <button on:click={() => goto(`planets${homeworld.url && `?id=${homeworld.url.split('/')[2]}`}`)}>view</button>
    </div>
{/if}

<style lang="scss">
    div {
        background: var(--color-bg-secondary);
        padding: 0.3rem;
        border-radius: 0.8rem;
        box-shadow: 0.02rem 0.1rem 0.2rem 0 #000, inset 0.1rem 0.1rem 1rem -0.6rem #000;
        border: 1px solid #ffe820;

        display: grid;

        img {
            width: 100%;
            border-radius: 0.5rem;
            justify-self: center;
        }

        b {
            display: grid;
            margin: 0.5rem 0.5rem -0.2rem;
        }

        button {
            padding: 0.7rem;
            margin: 0.5rem;
        }
    }
</style>

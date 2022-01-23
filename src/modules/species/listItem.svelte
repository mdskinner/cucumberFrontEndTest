<script lang="ts">
    import { goto } from '@sapper/app'
    import { handleAvatarImgError } from '_helpers/errorHandlers'

    import Homeworld from 'modules/planets/homeworld.svelte'

    export let species: ISpecies
</script>

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

{#if species}
    <div>
        <img src={species.image || 'avatar-placeholder.png'} on:error={handleAvatarImgError} alt="avatar" />

        <b>
            <h3>species: <span>{species.name}</span></h3>
            <h3>classification: <span>{species.classification}</span></h3>
            <h3>language: <span>{species.language}</span></h3>

            <Homeworld homeworld={species.homeworld} />
        </b>

        <button on:click={() => goto(`species${species.url && `?id=${species.url.split('/')[2]}`}`)}>view</button>
    </div>
{/if}

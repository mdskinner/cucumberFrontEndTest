<script lang="ts">
    import { goto } from '@sapper/app'
    import { handleAvatarImgError } from '_helpers/errorHandlers'
    import { peopleSelected } from 'modules/people/store'

    import SelectionTick from '_icons/check-circle-solid.svelte'
    import SpeciesName from 'modules/species/name.svelte'
    import Homeworld from 'modules/planets/homeworld.svelte'
    import CostOfLiving from 'modules/planets/costOfLiving.svelte'

    export let character: IPerson
    let selected = false

    const selectCharacter = e => {
        if (['BUTTON', 'A'].includes(e.target.nodeName)) return

        $peopleSelected = $peopleSelected.filter((p: IPerson) => p.name != character.name)

        if (!selected) $peopleSelected = [...$peopleSelected, character]
    }

    $: selected = !!$peopleSelected.find((p: IPerson) => p.name == character.name)
</script>

{#if character}
    <div class:selected on:click={selectCharacter}>
        <b class="select"><SelectionTick /></b>

        <img src={character.image || 'avatar-placeholder.png'} on:error={handleAvatarImgError} alt="avatar" />

        <b>
            <h3>name: <span>{character.name}</span></h3>

            {#each character.species as speciesUrl}
                <SpeciesName {speciesUrl} />
            {:else}
                <h3>species: <span>Unknown</span></h3>
            {/each}

            <Homeworld homeworld={character.homeworld} />
            <CostOfLiving homeworld={character.homeworld} />
        </b>

        <button on:click={() => goto(`people${character.url && `?id=${character.url.split('/')[2]}`}`)}>view</button>
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
        grid-template-columns: min-content 1fr;
        width: 100%;
        max-width: 40rem;
        cursor: pointer;

        @media (max-width: 37.5em /* bp600 */) {
            grid-template-columns: 1fr;
        }

        &.selected {
            border: 1px solid green;
            box-shadow: 0.01rem 0.01rem 0.2rem 0 #2c2cff, inset 0.1rem 0.1rem 1rem -0.6rem #000;

            b.select :global(svg path) {
                fill: forestgreen;
            }
        }

        img {
            width: 10rem;
            border-radius: 0.5rem;
            justify-self: center;

            @media (max-width: 37.5em /* bp600 */) {
                width: 100%;
            }
        }

        b {
            display: grid;
            align-items: center;
            align-self: center;
            justify-self: center;
            width: max-content;
            margin: 0.4rem 0.8rem 0.2rem 0;

            @media (max-width: 37.5em /* bp600 */) {
                grid-auto-rows: 3rem;
                margin: 0.5rem 0.5rem 0rem;
                width: calc(100% - 1.5rem);
            }
        }

        button {
            padding: 0.7rem;
            margin: 0.5rem;
            grid-column: 1 / span 2;

            @media (max-width: 37.5em /* bp600 */) {
                grid-column: 1;
            }
        }

        b.select {
            position: absolute;
            top: 0.5rem;
            right: 0.55rem;
            margin: 0;
            width: max-content;
            z-index: 1;

            @media (max-width: 50em /* bp800 */) {
                top: 0.3rem;
                right: 0.6rem;
            }
        }
    }
</style>

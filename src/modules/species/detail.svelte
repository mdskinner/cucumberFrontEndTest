<script lang="ts">
    import moment from 'moment'
    import { onMount } from 'svelte'
    import { stores, goto } from '@sapper/app'

    import api from '_config/api'

    import { handleImgError } from '_helpers/errorHandlers'

    import { speciesCollection } from 'modules/species/store'

    import BackArrow from '_icons/chevron-left-solid.svelte'
    import Homeworld from 'modules/planets/homeworld.svelte'

    const { page } = stores()
    let { id } = $page.query

    let species: ISpecies

    onMount(async () => {
        species = $speciesCollection?.find((s) => s.url == `/species/${id}/`) || (await getData())
    })

    let getData = async () => await api.Species.item($page.query.id)
</script>

<style lang="scss">
    section {
        display: grid;
        grid-template-rows: 1fr 6rem;
        margin: 0 3.8rem;

        @media (max-width: 55em /* bp800 */) {
            justify-content: center;
            margin: 0 0 0 3.8rem;
        }

        div {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: min-content 1fr;
            background: var(--color-bg-secondary);
            padding: 0.3rem;
            border-radius: 0.8rem;

            @media (max-width: 55em /* bp800 */) {
                grid-gap: 0.3rem;
                grid-template-columns: 1fr;
            }

            img {
                border-radius: 0.5rem;

                @media (max-width: 55em /* bp800 */) {
                    width: 100%;
                }
            }

            b {
                display: grid;
                width: 100%;
                max-width: 25rem;
                justify-self: center;
                align-self: center;
                transform: translate(0.5rem, 0.2rem);

                @media (max-width: 55em /* bp800 */) {
                    max-width: unset;
                    justify-self: start;
                }
            }

            :global(h3) {
                color: #555;
                margin: 0.25rem 0;
            }
            :global(h3 span) {
                float: right;
                background: white;
                color: #000;
                font-weight: 300;
                border-radius: 0.5rem;
                transform: translate(0, -0.2rem);
                padding: 0.5rem 1rem;
                margin: 0 0.8rem;

                &::first-letter {
                    text-transform: uppercase;
                }
            }
        }

        button {
            margin: 1rem;
        }
    }
    span.back {
        position: absolute;
        z-index: 3;
    }
</style>

<span class="back" on:click={() => history.back()}><BackArrow /></span>

<section>
    {#if species}
        <div>
            <img src={species.image || 'image-placeholder.png'} on:error={handleImgError} alt="avatar" />

            <b>
                <h3>species: <span>{species.name}</span></h3>
                <h3>classification: <span>{species.classification}</span></h3>
                <h3>designation: <span>{species.designation}</span></h3>
                <h3>average height: <span>{species.average_height}</span></h3>
                <h3>hair colors: <span>{species.hair_colors}</span></h3>
                <h3>average lifespan: <span>{species.average_lifespan}</span></h3>
                <h3>language: <span>{species.language}</span></h3>

                <Homeworld homeworld={species.homeworld} />

                <!-- 
                    people: string[],
                    films: string[], 
                -->

                <h3>created <span>{moment(species.created).fromNow()}</span></h3>
            </b>
        </div>

        <button on:click={() => goto('species')}>view all species</button>
    {:else}
        <h2>Loading species...</h2>
    {/if}
</section>

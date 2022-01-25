<script lang="ts">
    import moment from 'moment'
    import { onMount } from 'svelte'
    import { stores, goto } from '@sapper/app'

    import api from '_config/api'

    import { numberFormat } from '_helpers/numbers'
    import { handleImgError } from '_helpers/errorHandlers'

    import { planets } from 'modules/planets/store'

    import BackArrow from '_icons/chevron-left-solid.svelte'

    const { page } = stores()
    let { id } = $page.query

    let planet: IPlanet

    onMount(async () => {
        planet = $planets?.find(p => p.url == `/planets/${id}/`) || (await getData())
    })

    let getData = async () => await api.Planets.item($page.query.id)
</script>

<span class="back" on:click={() => history.back()}><BackArrow /></span>

<section>
    {#if planet}
        <div>
            <img src={planet.image || 'image-placeholder.png'} on:error={handleImgError} alt="avatar" />

            <b>
                <h3>planet: <span>{planet.name}</span></h3>
                <h3>living cost: <span>{planet.orbital_period}</span></h3>
                <h3>rotation period: <span>{numberFormat(planet.rotation_period)}</span></h3>
                <h3>orbital period: <span>{numberFormat(planet.orbital_period)}</span></h3>
                <h3>diameter: <span>{numberFormat(planet.diameter)}</span></h3>
                <h3>climate: <span>{planet.climate}</span></h3>
                <h3>gravity: <span>{planet.gravity}</span></h3>
                <h3>terrain: <span>{planet.terrain}</span></h3>
                <h3>surface water: <span>{planet.surface_water}</span></h3>
                <h3>population: <span>{numberFormat(planet.population)}</span></h3>
                <h3>created <span>{moment(planet.created).fromNow()}</span></h3>
            </b>
        </div>

        <button on:click={() => goto('planets')}>view all planets</button>
    {:else}
        <h2>Loading planet...</h2>
    {/if}
</section>

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

<script lang="ts">
    import moment from 'moment'
    import { onMount } from 'svelte'
    import { stores, goto } from '@sapper/app'

    import api from '_config/api'

    import { handleAvatarImgError } from '_helpers/errorHandlers'

    import { people } from 'modules/people/store'

    import BackArrow from '_icons/chevron-left-solid.svelte'
    import SpeciesName from 'modules/species/name.svelte'
    import Homeworld from 'modules/planets/homeworld.svelte'
    import CostOfLiving from 'modules/planets/costOfLiving.svelte'

    const { page } = stores()
    let { id } = $page.query

    let person: IPerson

    onMount(async () => {
        person = $people?.find((p) => p.url == `/people/${id}/`) || (await getData())
    })

    let getData = async () => await api.People.item($page.query.id)
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
    {#if person}
        <div>
            <img src={person.image || 'avatar-placeholder.png'} on:error={handleAvatarImgError} alt="avatar" />

            <b>
                <h3>name: <span>{person.name}</span></h3>
                <h3>birth year: <span>{person.birth_year}</span></h3>
                <h3>gender: <span>{person.gender}</span></h3>
                <h3>height: <span>{person.height}</span></h3>
                <h3>mass: <span>{person.mass}</span></h3>
                <h3>eye color: <span>{person.eye_color}</span></h3>
                <h3>hair color: <span>{person.hair_color}</span></h3>
                <h3>skin color: <span>{person.skin_color}</span></h3>

                <!-- 
                    vehicles: string[]
                    starships: string[]
                    films: string[]
                -->

                {#each person.species as speciesUrl}
                    <SpeciesName {speciesUrl} />
                {/each}

                <Homeworld homeworld={person.homeworld} />
                <CostOfLiving homeworld={person.homeworld} />

                <h3>created <span>{moment(person.created).fromNow()}</span></h3>
            </b>
        </div>

        <button on:click={() => goto('.')}>view all characters</button>
    {:else}
        <h2>Loading character...</h2>
    {/if}
</section>

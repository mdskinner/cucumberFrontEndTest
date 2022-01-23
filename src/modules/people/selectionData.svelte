<script lang="ts">
    import { numberFormat } from '_helpers/numbers'
    import { peopleSelected } from 'modules/people/store'
    import { planets } from 'modules/planets/store'

    import CloseButton from '_icons/times-circle-solid.svelte'

    $: feesSplit = fees.toFixed(5).split('.')

    $: fees = $peopleSelected.reduce((x, item) => {
        let { fees_per_day } = $planets.find((p) => p.url == item.homeworld)

        let value = fees_per_day.split('').pop() == 'c' ? parseFloat(fees_per_day) / 100 : parseFloat(fees_per_day.slice(1))

        return x + value
    }, 0)
</script>

<style lang="scss">
    section {
        position: fixed;
        display: grid;
        height: 6.4rem;
        bottom: 0;
        left: 0;
        width: 100vw;
        color: #381a1a;
        background: #ffe820ed;
        box-shadow: 0 0.3rem 0.5rem 0.2rem black, inset 0 0 2rem -1rem black;
        z-index: 10;
        animation: fadeSlideIn 0.7s 1 ease-in-out;
        align-items: center;
        grid-template-columns: 1fr 4rem;

        div {
            display: grid;
            justify-content: center;

            h3 {
                margin: 0;
                color: #505100;
                padding: 0.23rem 2rem;

                span {
                    background: #d8c72f;
                    color: #000;
                    padding: 0.5rem 1rem;
                    font-weight: 300;
                    border-radius: 0.5rem;
                    display: inline-block;
                    transform: translate(0.3rem, 0rem);
                    box-shadow: inset 0 0 0.7rem -0.5rem black;
                }
            }
        }

        b {
            :global(svg path) {
                fill: #3735008a;
            }
        }
    }

    @keyframes fadeSlideIn {
        0% {
            opacity: 0;
            bottom: -20rem;
        }
        to {
            opacity: 1;
            bottom: 0;
        }
    }
</style>

{#if $peopleSelected.length}
    <section>
        <div>
            <h3>Selected characters: <span>{$peopleSelected.length}</span></h3>
            <h3>Total fees per day: <span>${`${numberFormat(feesSplit[0])}.${feesSplit[1]}`}</span></h3>
        </div>

        <b on:click={() => ($peopleSelected = [])}>
            <CloseButton />
        </b>
    </section>
{/if}

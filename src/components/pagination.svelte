<script lang="ts">
    import { page, take } from '_stores/ui'

    import PreviousArrow from '_icons/caret-left-solid.svelte'
    import NextArrow from '_icons/caret-right-solid.svelte'

    export let total: number

    let pageMax
    let prev
    let next

    $: {
        pageMax = Math.ceil(total / $take) || 1

        prev = $page >= 1
        next = $page < pageMax - 1
    }

    let handleClick = (pageNumber) => {
        if (pageNumber < 0 || pageNumber > pageMax) return

        $page = pageNumber
    }
</script>

<style lang="scss">
    section {
        display: grid;
        grid-gap: 0.3rem;
        grid-auto-flow: column;

        padding: 0.2rem;
        justify-self: center;
        justify-content: stretch;

        animation: fadeIn ease 1.5s;
        -webkit-animation: fadeIn ease 1.5s;

        h5 {
            text-align: center;
            padding: 0.8rem 1rem 0.5rem;
            margin: 0 0 0.2rem;

            font-size: 1.7rem;
            font-weight: 100;
            cursor: default;
            line-height: 3rem;
            height: 4.8rem;

            code {
                padding: 0.5rem 1rem;
            }

            @media (max-width: 25em /* bp400 */) {
                padding: 0.8rem 1rem 0.5rem;
            }
        }

        span {
            border-radius: var(--border-radius);
            align-content: center;
            display: grid;
            justify-content: center;

            cursor: pointer;

            background: var(--color-accent);

            :global(svg) {
                width: 1rem;
            }

            &:hover {
                background: var(--color-secondary);
            }

            &.disabled {
                pointer-events: none;
                opacity: 0.2;
            }
        }
    }
</style>

<section>
    {#if prev || next}
        <span on:click={() => prev && handleClick($page - 1)} class:disabled={!prev}>
            <PreviousArrow />
        </span>
    {/if}

    <h5>Page: <code>{$page + 1}</code> of <code>{pageMax}</code></h5>

    {#if prev || next}
        <span on:click={() => next && handleClick($page + 1)} class:disabled={!next}>
            <NextArrow />
        </span>
    {/if}
</section>

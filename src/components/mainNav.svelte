<script lang="ts">
    import BurgerMenu from '_icons/bars-solid.svelte'

    export let segment: string

    let menuOpen = false

    const links = ['planets', 'species']
</script>

<style lang="scss">
    nav {
        display: grid;
        grid-template-columns: min-content 1fr;

        b {
            display: none;
            justify-self: end;

            @media (max-width: 37.5em /* bp600 */) {
                display: block;
            }
        }

        div {
            display: grid;
            grid-auto-flow: column;
            min-width: min-content;
            padding: 0 0.5rem;
            justify-content: center;

            a {
                padding: 1.8rem 2rem;
                color: var(--color);
                text-decoration: none;
                text-transform: uppercase;

                &.logo {
                    padding: 0;

                    img {
                        width: 7.47rem;
                    }
                }

                &:hover {
                    color: var(--color-secondary);
                }
            }

            & > * {
                min-width: max-content;
            }
            &:first-child {
                justify-content: start;
            }
            &:last-child {
                justify-content: end;
            }

            &.main {
                display: grid;

                @media (max-width: 37.5em /* bp600 */) {
                    display: none;
                }
            }
            &.menuOpen {
                display: grid;

                @media (max-width: 37.5em /* bp600 */) {
                    grid-auto-flow: row;
                    grid-column: 1 / span 2;
                    justify-content: center;
                    justify-items: center;
                }
            }

            [aria-current] {
                position: relative;
                display: inline-block;
            }

            [aria-current]::after {
                position: absolute;
                content: '';
                width: calc(100% - 2em);
                height: 2px;
                background-color: #ff3e00;
                display: block;
                bottom: -1px;
                left: 1rem;
            }
        }
    }
</style>

<nav>
    <div><a href="." class="logo"> <img src="logo.svg" alt="Starwars Directory" /> </a></div>

    <b class:menuOpen on:click={() => (menuOpen = !menuOpen)}>
        <BurgerMenu />
    </b>

    <div class="main" class:menuOpen>
        <a aria-current={!segment || segment === 'people' ? 'page' : undefined} href=".">characters</a>
        {#each links as item}<a href={item} aria-current={segment === item ? 'page' : undefined}> {item} </a>{/each}
    </div>
</nav>

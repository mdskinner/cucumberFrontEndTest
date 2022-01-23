<script lang="ts">
    export let segment: string

    import SSRLinks from 'components/ssrLinks.svelte'
    import Nav from 'components/mainNav.svelte'
</script>

<style lang="scss">
    div.app {
        display: grid;
        grid-template-rows: max-content 1fr;
        min-height: 100vh;

        header {
            background: #000;
        }
        main {
            padding: 0.5rem;
            min-height: 100%;
            background: #5c6b73;
            box-shadow: inset 0 2rem 0.3rem -2rem #000;
        }
    }
</style>

<!-- generates static files on build & export -->
<SSRLinks />
<!--  -->

<div class="app">
    <header>
        <Nav {segment} />
    </header>

    <main>
        <slot />
    </main>
</div>

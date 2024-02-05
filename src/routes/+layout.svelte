<script lang="ts">
    import { base } from '$app/paths';
    import '$lib/app.css';
    import LinkedIn from '$lib/icons/linkedin.svg?raw';
</script>

<div id="app">
    <header>
        <h2><a href="{base}">dunkeln.github.io</a></h2>

        <nav>
            <a href="{base}/about">about</a>
            <a href="{base}">posts</a>
            <a href="{base}/projects">projects</a>
        </nav>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer>
        {@html LinkedIn}
    </footer>
</div>

<style>
    h2 {
        font-family: 'Gamja Flower', sans-serif;
    }

    :global(svg) {
        width: 2.2rem;
    }
</style>

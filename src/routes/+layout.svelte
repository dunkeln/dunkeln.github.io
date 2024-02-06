<script lang="ts">
    import { base } from '$app/paths';
    import '$lib/app.css';
    import MouseCursor from '$lib/components/MouseCursor.svelte';
    import LinkedIn from '$lib/icons/linkedin.svg?raw';
    import GitHub from '$lib/icons/github.svg?raw';
    import Kaggle from '$lib/icons/kaggle.svg?raw';
</script>

<MouseCursor/>
<div id="app">
    <header>
        <h2><a href="{base}">dunkeln.github.io</a></h2>

        <nav>
            <a href="{base}/about">about</a>
            <a href="{base}">posts</a>
            <a href="{base}">projects</a>
        </nav>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer>
        <a 
            href="https://www.linkedin.com/in/prateek-pravanjan"
            target="_blank">
            {@html LinkedIn}
        </a>
        {@html Kaggle}
        <a 
            href="https://www.github.com/dunkeln"
            target="_blank">
            {@html GitHub}
        </a>
    </footer>
</div>

<style>
    h2 {
        font-family: 'Gamja Flower', sans-serif;
    }

    :global(svg) {
        width: 2.2rem;
        padding: 2rem;
    }
</style>

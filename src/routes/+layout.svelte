<script lang="ts">
    import { base } from '$app/paths';
    import '$lib/app.css';
    import MouseCursor from '$lib/components/MouseCursor.svelte';
    import LinkedIn from '$lib/icons/linkedin.svg?raw';
    import GitHub from '$lib/icons/github.svg?raw';
    import Kaggle from '$lib/icons/kaggle.svg?raw';
    import LinkTree from '$lib/icons/linktree.svg?raw';
    import Spotify from '$lib/icons/spotify.svg?raw';
</script>

<MouseCursor/>
<div id="app">
    <header>
        <h2><a href="{base}">dunkeln.github.io</a></h2>
        <nav>
            <a href="{base}/about">about</a>
            <a href="{base}/posts">posts</a>
            <a href="{base}/projects">projects</a>
        </nav>
    </header>

    <main>
        <slot></slot>
    </main>

</div>

<footer>
    <a 
        href="https://www.linkedin.com/in/prateek-pravanjan"
        target="_blank">
        {@html LinkedIn}
    </a>
    <a 
        href="https://www.kaggle.com/dunkeln"
        target="_blank">
        {@html Kaggle}
    </a>
    <a 
        href="https://www.github.com/dunkeln"
        target="_blank">
        {@html GitHub}
    </a>
    <a 
        href="https://linktr.ee/dunkeln"
        target="_blank">
        {@html LinkTree}
    </a>
    <a 
        href="https://open.spotify.com/user/prateekpravanjan?si=118f3f05421c45a7"
        target="_blank">
        {@html Spotify}
    </a>
</footer>

<style>
    h2 {
        font-family: 'Gamja Flower', sans-serif;
    }

    :global(svg) {
        width: 1.5rem;
    }
</style>

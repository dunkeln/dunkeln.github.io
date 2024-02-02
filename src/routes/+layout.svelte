<<<<<<< HEAD
<header>
    <h4><a href="/">dunkeln.github.io</a></h4>

    <nav>
        <a href="/about">about</a>
        <a href="/posts">posts</a>
        <a href="/projects">projects</a>
    </nav>
</header>
<main>
    <slot></slot>
</main>
<footer>
</footer>
=======
<script lang="ts">
    import { base } from '$app/paths';
</script>

<header>
    <h4><a href="{base}">dunkeln.github.io</a></h4>

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
    add links here
</footer>
>>>>>>> temp

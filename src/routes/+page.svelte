<script lang="ts">
    import { base } from '$app/paths';
    import { copy } from 'svelte-copy';
    import Template from '$lib/components/Template.svelte';
</script>

<Template>
    <div style="text-align: left;">
        <span id="hero-intro">
            Hi, I am Prateek! 👾
        </span>
        <br/>
        <em>
        a Grad Student from Stevens Institute of Technology, NJ, USA.<br/>
        Studying Masters of Science in Applied AI.<br/>
        Foundations in NLP, Genetic AI and leaning towards becoming more holistic.<br/>
        Plugged to music 24x7, rust advocate and hobbyist programmer.<br/>
        Learn more in the<a href="{base}/about">about</a>page<br/><br/><br/>
        💼 <span style="background: white;">Looking for Summer Internship  in AI and Machine Learning!!</span><br/><br/>
        </em>

        <div style="text-align: center;">
            <button 
                use:copy={"prateekpravanjan@gmail.com"}
                on:svelte-copy={(_) => alert("email id copied to clipboard")}>
                GET IN TOUCH
            </button>
        </div>
    </div>
</Template>

<style>
    button {
        border: 3px solid black;
        color: inherit;
        font-family: inherit;
        padding: 1rem 3rem 1rem 3rem;
        background: transparent;
    }

    #hero-intro {
        font-family: monospace;
        font-size: 2rem;
        font-weight: bolder;
    }
</style>

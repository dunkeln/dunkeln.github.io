<script lang="ts">
    import Xp from '$lib/components/Xp.svelte';
    import Template from '$lib/components/Template.svelte';
    import exp from './log';
</script>

<Template>
        <h3>Experience</h3>
        <div id="chronology" style="text-align: left; overflow: scroll;">
            <ul>
                {#each exp as x}
                    <Xp {...x}/>
                {/each}
            </ul>
        </div>
</Template>

<style>
    #chronology {
        max-width: 60%;
        min-width: 60%;
        max-height: 80vh;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }

    ul {
        border-left: 3px dotted black;
        padding: 0.4rem;
        list-style-type: none;
    }

    #chronology::-webkit-scrollbar {
        display: none;
    }
</style>

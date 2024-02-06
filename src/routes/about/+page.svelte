<script lang="ts">
    import Xp from '$lib/components/Xp.svelte';
    import Template from '$lib/components/Template.svelte';
    import exp from './log';
</script>

<Template>
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
    }

    ul {
        border-left: 3px dotted black;
        padding: 0rem;
        list-style-type: none;
    }

    #chronology::-webkit-scrollbar {
        display: none;
    }
</style>

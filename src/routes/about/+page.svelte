<script lang="ts">
    import Template from '$lib/components/Template.svelte';
    import { base } from '$app/paths';
    import exp from './log';
    import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent
	} from 'svelte-vertical-timeline';
    import Svelte from '$lib/icons/svelte.svg?raw';
    import Python from '$lib/icons/python.svg?raw';
    import Pytorch from '$lib/icons/pytorch.svg?raw';
    import Numpy from '$lib/icons/numpy.svg?raw';
    import Git from '$lib/icons/git.svg?raw';
    import Ts from '$lib/icons/typescript.svg?raw';
    import Vim from '$lib/icons/vim.svg?raw';
    import Rust from '$lib/icons/rust.svg?raw';

</script>

<Template>
    <div id="container">
        <div>
            <span style="font-size: 2rem; text-decoration: underline;">Skills</span>
            <div id="icons">
                {@html Python}
                {@html Pytorch}
                {@html Numpy}
                {@html Git}
                {@html Ts}
                {@html Svelte}
                {@html Vim}
            </div>
        </div>
        <div>
            <span style="font-size: 2rem; text-decoration: underline;">Experience</span>
            <Timeline position="alternate">
                {#each exp as x}
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <h5>{x.start + " to " + x.end}</h5>
                            <h3>{x.title}</h3>
                            <em>
                                {x.desc}
                            </em>
                        </TimelineContent>
                    </TimelineItem>
                {/each}
            </Timeline>
            <img src="{base}/ye.png" alt="">
        </div>
    </div>
</Template>

<style>
     em {
         color: grey;
     }

     #container {
         display: flex;
         flex-direction: column;
         overflow-y: hidden;
     }

     #icons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
     }

     :global(#icons > svg) {
         width: 4.6rem;
         padding: .5rem;
     }

     img {
         width: 18rem;
     }
</style>

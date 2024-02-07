<script lang="ts">
    import Template from '$lib/components/Template.svelte';
    import exp from './log';
    import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent
	} from 'svelte-vertical-timeline';

</script>

<Template>
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
</Template>

<style>
     em {
         color: grey;
     }
</style>

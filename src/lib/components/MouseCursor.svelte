<script lang="ts">
	import { spring } from 'svelte/motion';

	let coords1 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	let coords2 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.35
		}
	);

	let size = spring(10);

</script>

<svelte:window
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY })
		coords2.set({ x: e.clientX, y: e.clientY })
	}}
	on:mousedown={(_) => {
		size.set(30);
	}}
	on:mouseup={(_) => {
		size.set(10);
	}}
/>

<svg
	class ="w-full h-full"
>
	<circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke="black" stroke-width="2" fill-opacity="0"/>
	<circle cx={$coords2.x} cy={$coords2.y} r={$size/4} fill="orange"/>
</svg>

<style>
	:global(body) {
		cursor: none;
	}
	
	.w-full {
		width: 100vw;
	}
	
	.h-full {
		height: 100vw;
	}
	
	svg {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
        z-index: 100;
        padding: 0;
        margin: 0;
	}
</style>

<script lang="ts">
    export let title = "title";
    export let desc = "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";
    export let start = "2024-02-05";
    export let end = "2024-02-05";
    export let zidx = 0; // 1 > 0
</script>

<li>
    <div>
        <h5><em>{start} to {end}</em></h5>
        {#if zidx === 0}
            <h4 style="text-decoration: none;">{title}</h4>
        {:else}
            <h4 style="text-decoration: wavy underline;">{title}</h4>
        {/if}
        <details open={true}>
            {desc}
        </details>
    </div>
</li>


<style>
    li {
        position: relative;
        padding-left: 20px; /* Adjust according to your preference */
    }

    li::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateX(-50%);
        width: 16px; /* Diameter of the circle */
        height: 16px; /* Diameter of the circle */
        border-radius: 50%; /* Make it a circle */
        background-color: black; /* Circle color */
    }

    div {
        background: #ed550c;
        border: 2px solid black;
        border-radius: .3rem;
        margin: 2rem;
        margin-left: 1rem;
        padding: 1.3rem;
    }

    details::marker {
        display: none;
    }
</style>

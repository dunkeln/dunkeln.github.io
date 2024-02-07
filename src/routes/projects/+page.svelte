<script lang="ts">
    import { onMount } from "svelte";

    let repos: object[] = [];

    // TODO: deconstruct repos and represent 
    onMount(async () => {
        const resp = await fetch(`https://api.github.com/users/dunkeln/repos`);
        repos = await resp.json();
    });
</script>

<h3>
STILL BUILDING THIS END OF THE SITE...
<img
    src="https://media2.giphy.com/media/l41YyO0WhcdDJsje0/200.webp?cid=790b7611mw0uxw2y2ullokqu8i2wf8gprwzrgte2i1bokti5&ep=v1_gifs_search&rid=200.webp&ct=g"/>
</h3>


<style>
    h3 {
        text-align: center;
        font-size: 7rem;
        font-weight: bold;
    }
    img {
        width: 40rem;
    }

    @media only screen and (max-device-width: 430px) {
        h3 {
            word-wrap: break-word;
        }
    }
</style>

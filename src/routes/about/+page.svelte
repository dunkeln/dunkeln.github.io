<script lang="ts">
    import Profile from '$lib/final-photo.gif';
    import Experience from './Experience.svelte';
</script>

<div class="container">
    <div class="wobble-border img-div">
        <div class="wobble-border img-div" style="background: orange;">
            <img src={Profile} alt="" class="wobble-border">
        </div>
    </div>

    <div style="text-align: left;">
        <Experience title={"Masters at Stevens"}/>
        <Experience title={"Research Internship at IIT"}/>
        <Experience title={"Core Member @DSC, Google"}/>
        <Experience title={"IT Intern at Diyar, Kuwait"}/>
        <Experience title={"BTech. from NIT, Surat"}/>
    </div>
</div>

<style>
    .container {
        padding: 3rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    img {
        width: 13.9rem;
        padding: 0;
        border: 3px solid white;
    }

    .img-div {
        border: 3px solid black;
        display: flex;
        width: 14rem;
    }

    .wobble-border {
        border-radius: 250px 750px 250px 750px /
                     750px 250px 750px 250px;
        animation: wobble 3s ease-in-out alternate infinite;
    }

    @keyframes wobble {
      50% {
        border-radius: 750px 550px 350px 750px /
                       350px 750px 550px 450px;
      }
      100% {
        border-radius: 750px 250px 750px 250px /
                       250px 750px 250px 750px;
      }
    }
</style>

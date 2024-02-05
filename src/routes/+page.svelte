<script lang="ts">
    import Profile from '/final-photo.gif';
    import { base } from '$app/paths';

    function handleEmail() {
        navigator.clipboard.writeText("prateekpravanjan@gmail.com");
    }
</script>

<div class="container">
    <div class="wobble-border img-div">
        <div class="wobble-border img-div" style="background: orange;">
            <img src={Profile} alt="" class="wobble-border">
        </div>
    </div>

    <div style="text-align: left;">
        <span id="hero-intro">
            Hi, I am <span id="intro">Dunkeln, otw!</span>
        </span>
        <br/>
        <em>
        a Grad Student from Stevens Institute of Technology, NJ, USA.<br/>
        Studying Masters of Science in Applied AI.<br/>
        Foundations in NLP, Genetic AI and leaning towards becomign more holistic.<br/>
        Rust advocate and hobbyist programmer on the side.<br/>
        Learn more in the<a href="{base}/about">about</a>page<br/><br/><br/>
        💼 <span style="background: white;">Looking for Summer Internship  in AI and Machine Learning!!</span><br/><br/>
        </em>

        <div style="text-align: center;">
            <button on:click={handleEmail}> GET IN TOUCH </button>
        </div>
    </div>
</div>

<style>
    .container {
        padding: 3rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    button {
        border: 3px solid black;
        color: inherit;
        font-family: inherit;
        padding: 1rem 3rem 1rem 3rem;
        background: transparent;
    }

    img {
        width: 15.9rem;
        padding: 0;
        border: 3px solid white;
    }

    .img-div {
        border: 3px solid black;
        display: flex;
        width: 17rem;
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

    #hero-intro {
        font-family: monospace;
        font-size: 2rem;
        font-weight: bolder;
    }
</style>

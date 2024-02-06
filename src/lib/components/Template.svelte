<script lang="ts">
    import { base } from "$app/paths";
</script>

<div class="container">
    <div id="outermost" class="wobble-border img-div">
        <div class="wobble-border img-div" style="background: orange;">
            <img src="{base}/final-photo.gif" alt="" class="wobble-border">
        </div>
    </div>
    <slot></slot>
</div>

<style>
    .container {
        padding: 3rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    #outermost {
        box-shadow: -2px 1px 10px 2px #5b4e4e;
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

<!-- To use this, Have to setup scrolltrigger from gsap in main app -->
<script lang="ts">
  /**
   * Data type
   */
  import { ParamData } from "./ScrollCrousel.type";

  // Tweens
  import { scroll } from "./ScrollTween";

  /**
   * Event
   */
  import { onMount } from "svelte";

  onMount(() => {
    const scenes = document.querySelectorAll(".scene");
    const carouselWrapper = document.querySelector(".carousel-wrapper");

    carouselWrapper.style.height = `${scenes.length * 100}vh`;
  });

  /**
   * Params
   */
  export let data: ParamData[];
  export let className: string;
</script>

<div use:scroll class={`carousel-container ${className}`}>
  <div class="carousel-wrapper">
    {#each data as img}
      <div class="scene" data-ani-type="">
        <div class="img-wrapper">
          <img src={img.src} alt={img.alt} />
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .carousel-container {
    width: 100%;
    height: 100%;

    overflow: hidden;

    .carousel-wrapper {
      position: relative;
      min-height: 100vh;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .scene {
      position: absolute;

      .img-wrapper {
        width: 100%;
        aspect-ratio: 1.6 / 1;

        img {
          width: 100%;
          height: 100%;

          object-fit: cover;
        }
      }
    }
  }
</style>

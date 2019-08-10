<script>
  import Swiper from "swiper";
  import { afterUpdate, onMount } from "svelte";
  let files = [];
  let container;
  let swiper;

  async function getPhotos() {
    files = await fetch("/slides.json").then(r => r.json());
    return files;
  }

  function fit(e) {
    const { target } = e;
    const { width, height } = target;

    if (width >= height) {
      // horizontal
      target.classList.add("horizontal");
    } else {
      // vertical
      target.classList.add("vertical");
    }

    target.classList.add("loaded");
  }

  onMount(() => {
    getPhotos();

    swiper = new Swiper(container, {
      direction: "horizontal",
      loop: true,
      keyboard: true,
      autoplay: true
    });

    window.swiper = swiper;
  });

  afterUpdate(() => {
    swiper.update();
  });
</script>

<style>
  :global(body) {
    background: black;
  }

  .swiper-container {
    height: 100vh;
    margin: 0;
  }

  :global(img) {
    display: block;
    margin: auto;
    opacity: 0;
    transition: opacity ease-in 0.25s;

    object-fit: contain;
    max-width: 100%;
  }

  :global(img.horizontal) {
    height: 100vh;
  }

  :global(img.vertical) {
    height: 100vh;
  }

  :global(img.loaded) {
    opacity: 1;
  }
</style>

<div class="swiper-container" bind:this={container}>
  <div class="swiper-wrapper">
    {#each files as filename}
      <div class="swiper-slide">
        <img src={filename} alt={filename} on:load={fit} />
      </div>
    {/each}
  </div>
</div>

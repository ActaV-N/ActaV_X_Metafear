<script lang="ts">
  import "../global.css";
  import type { LayoutData } from "./$types";

  /**
   * Components
   */
  import Navi from "@monorepo/common/Nav.svelte";
  import Logo from "@monorepo/common/Logos/LogoMetafear.svelte";

  /**
   * Scroll modules
   */
  import gsap from "gsap";
  import ScrollTrigger from "gsap/dist/ScrollTrigger";
  import Scrollbar from "smooth-scrollbar";
  import { onMount } from "svelte";

  /**
   * Layout server data
   */
  export let data: LayoutData;

  /**
   * Window Event Listen
   */
  import { mouse, innerWidth, innerHeight } from "../store/interact";

  // Mount
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scroller = document.querySelector("main");
    const smoothScroll = Scrollbar.init(scroller, {
      damping: 0.1,
      delegateTo: document,
    });

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          smoothScroll.scrollTop = value;
        }
        return smoothScroll.scrollTop;
      },
    });

    smoothScroll.addListener(ScrollTrigger.update);

    ScrollTrigger.defaults({
      scroller: scroller,
      pinType: "transform",
    });
  });

  //  Mouse
  const mousemove = (e: MouseEvent) => {
    mouse.update(() => ({
      x: (e.clientX / $innerWidth - 0.5) * 2,
      y: -(e.clientY / $innerHeight - 0.5) * 2,
    }));
  };
</script>

<svelte:window
  on:mousemove={mousemove}
  bind:innerWidth={$innerWidth}
  bind:innerHeight={$innerHeight}
/>

<Navi logo={Logo} links={data.links} />

<main>
  <slot />
</main>

<style>
  main {
    height: 100vh;
  }

  :global(.scrollbar-track) {
    z-index: 10000 !important;
  }
</style>

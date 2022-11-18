<script>
  import ScrollCarousel from "@monorepo/common/Carousel/ScrollCarousel.svelte";
</script>

<svelte:head>
  <title>Actav X Metafear</title>
</svelte:head>

<div class="carousel-container">
  <div class="carousel-wrapper">
    <!-- <ScrollCarousel
      className="carousel"
      data={[
        {
          src: "test/brand.jpg",
          alt: "brand",
          title: "Brand",
          description: "What is branding",
        },
        {
          src: "test/books.jpg",
          alt: "books",
          title: "Books",
          description: "Reading books",
        },
      ]}
    /> -->
    <div class="tmp-hello">
      <div class="head">
        <h1>Metafear</h1>
        <p>두려움을 두려워하라.</p>
      </div>
      <div class="desc">도전 공유 커뮤니티, 메타피어입니다.</div>
    </div>
  </div>
</div>

<style lang="scss">
  .tmp-hello {
    width: 100%;
    height: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .head {
      margin-bottom: 20px;

      h1 {
        font-weight: 400;
        font-size: 7vw;

        line-height: 0.9;
        letter-spacing: -0.03em;

        text-transform: uppercase;
      }
      p {
        font-weight: 400;
        font-size: 3vw;

        letter-spacing: 0.05em;
      }
    }

    .desc {
      font-size: 2.5vw;
      font-weight: 300;
    }
  }
  .carousel-container {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    .carousel-wrapper {
      width: 70%;
    }
  }
</style>

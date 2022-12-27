<script lang="ts">
  /**
   * Logo Data
   */
  export let logo;

  /**
   * Navigation Data
   */
  type NaviT = {
    href: string;
    name: string;
  };
  export let links: NaviT[] = [];
</script>

<nav>
  <div class="nav-wrapper">
    <div class="logo-container nav-item-container">
      <div class="logo-wrapper nav-item-container">
        <a href="/" class="anchor">
          <div>
            <svelte:component this={logo} />
          </div>
        </a>
      </div>
    </div>
    <div class="navi-container nav-item-container">
      <div class="navi-wrapper  nav-item-container">
        {#each links as link}
          <li>
            <a href={link.href} class="anchor">
              <div>
                {link.name}
              </div>
            </a>
          </li>
        {/each}
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    width: 100vw;
    height: 55px;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

    list-style: none;

    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(20px);

    .nav-item-container {
      height: 100%;
    }

    .nav-wrapper {
      width: 85%;
      height: 100%;
      margin: 0 auto;

      display: flex;
      align-items: center;
      justify-content: space-between;

      li {
        height: 100%;
      }

      a {
        text-decoration: none;
        color: #000;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.05em;

        transition: opacity 0.3s cubic-bezier(0.37, 0, 0.63, 1);

        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }

      .anchor {
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>

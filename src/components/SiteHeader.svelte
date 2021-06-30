<script>
export let title = 'Elliot Bentley';
export let subtitle;
export let sublink;
export let reducedSize = !!sublink;
export let parentTheme = 'dark';

let menuVisible = false;
const toggleMenu = () => {
  console.log('xx')
  menuVisible = !menuVisible;
  console.log(menuVisible)
}
</script>

<style lang="scss">

.title {
  font-family: 'Jost', sans-serif;
  font-size: 1.8em;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  max-width: 800px;
  margin: 0 auto;
  padding: 0.7em 40px;
  padding-right: 50px;
  color: var(--black);
  user-select: none;
  a {
    color: inherit;
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 200ms;
    &:hover {
      opacity: 0.8;
    }
  }
  .divider {
    opacity: 0.2;
  }
  .subtitle {

}
  @media (max-width: 500px) {
    line-height: 1.2em;
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    padding-left: 10px;
    
    .divider:before {
      content: '';
      display: block;
    }
  }
}



.nav {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
}

.external-links {
  display: flex;
  margin-top: 0.5em;
  li {
    margin-right: 1em;
  }
  img {
    width: 40px;
    height: 40px;
    filter: invert(100%);
  }
  a img {
    opacity: 0.6;
    transition: opacity 200ms;
  }
  a:hover {
    background: none;
    img {
      opacity: 0.8;
    }
  }
}

.dropdown-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: var(--black);
  color: var(--white);
  padding: 40px;
  transition: transform 200ms;
  transform: translateY(120%);
  border-top: 1px solid var(--grey);

  &.menu-visible {
    transform: translateY(calc(100vh - 400px));
  }

  a {
    color: white;
    font-family: var(--sans-serif);
    text-transform: uppercase;
    font-size: 32px;
    text-decoration: none;
    opacity: 0.6;
    transition: opacity 200ms;

    &:hover {
      opacity: 1;
    }
  }
}

.menu-toggle-holder {
  position: absolute;
  top: 44px;
  width: 35px;
  opacity: 0.5;
  transition: opacity 50ms;
  right: 44px;


  &.menu-toggle-holder-close {
    right: 44px;
  }

  &.reduced-size {
    width: 24px;
    top: 30px;
  }

  &.theme-light {
    img {
      filter: none;
    }
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  img {
    width: 100%;
    filter: invert(100%);
  }
}

@media (min-width: 800px) {
  .dropdown-menu {
    display: block !important;
    width: 300px;
    border-left: 1px solid var(--grey);
    border-top: none;
    transform: translateX(100vw);
    transition: transform 200ms;
    &.menu-visible {
      transform: translateX(calc(100vw - 390px));
    }
  }
  .menu-toggle-holder {
    right: calc(50vw - 430px);
  }
}

@media (max-width: 500px) {  .menu-toggle-holder {
    right: 20px;
  }
}


</style>

<nav class="header">
  <h1 class="title">
    <a href="/">{title}</a>
    {#if subtitle}
      <span><span class="divider"> ⟶ </span><a class="subtitle" href={sublink}>{subtitle}</a></span>
    {/if} 
  </h1>

  <div class="menu-toggle-holder theme-{parentTheme}" class:reduced-size="{reducedSize}" >
    <img src="/images/bars-solid.svg" alt="Show menu" class="menu-toggle"  on:click={toggleMenu} />
  </div>

  <div class="dropdown-menu" class:menu-visible="{menuVisible}">
    <ul class="internal-links">
      <li><a href="/">
        Home
      </a></li>
      <li><a href="/portfolio">
        Portfolio
      </a></li>
      <li><a href="/blog">
        Blog
      </a></li>
    </ul>

    <ul class="external-links">
      <li><a href="mailto:mail@elliotbentley.com">
        <img src="/images/envelope.svg" alt="Email">
      </a></li>
      <li>
        <a href="https://twitter.com/elliot_bentley">
          <img src="/images/twitter.svg" alt="Twitter">
        </a>
      </li>
      <li><a href="https://github.com/ejb">
        <img src="/images/github.svg" alt="GitHub">
      </a></li>
    </ul>

    <div class="menu-toggle-holder menu-toggle-holder-close">
      <img src="/images/times-solid.svg" alt="Hide menu" class="menu-toggle" on:click={toggleMenu} />
    </div>

  </div>
</nav>

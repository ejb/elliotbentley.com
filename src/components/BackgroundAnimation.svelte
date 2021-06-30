<script>
import {createAnimation} from './animation.js';
import { onMount } from 'svelte';
import { debounce } from './debounce';

let animationElement;
let getRequestID;

function initAnimation() {
  const colors = [
    '#87121C',
    '#053c5e',
  ];
  // https://coolors.co/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1
  
  const element = animationElement;
  const speed = 0.5;
  getRequestID = createAnimation(element, colors, speed);
}

onMount(initAnimation);

if (globalThis && 'addEventListener' in globalThis) {
  globalThis.addEventListener('resize', debounce(() => {
    window.cancelAnimationFrame(getRequestID());
    initAnimation();
  }));
}
</script>

<style lang="scss">
.animation {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #053c5e;
  z-index: -1;
}

 .animation::before {
  content: "";
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  pointer-events: none;
}


</style>

<div
  class="animation"
  bind:this={animationElement}
></div>

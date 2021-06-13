<script>
import {createAnimation} from './animation.js';
import { onMount } from 'svelte';

let animationElement;

function initAnimation() {
  const colors = [
    '#844da3',
    '#663b94',
    '#431c76',
    '#221c69',
    '#080942',
  ];
  // https://coolors.co/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1
  
  const element = animationElement;
  const speed = 1;
  createAnimation(element, colors, speed);
}

onMount(initAnimation);
</script>

<style lang="scss">
.animation {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #333333;
  z-index: -1;
}

 .animation::before {
  content: "";
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(25vw);
  backdrop-filter: blur(25vw);
  pointer-events: none;
}


</style>

<div class="animation" bind:this={animationElement}></div>

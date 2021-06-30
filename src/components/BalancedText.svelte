<script>
export let text;

import textBalancer from './text-balancer.js';

import { onMount } from 'svelte';

onMount(() => {
  console.log(window)
  try {
    textBalancer.balanceText('.balance-text')
  } catch (err) {
    console.log(err)
  }
  console.log('done')
});
</script>

<div class="balance-text">{text}</div>

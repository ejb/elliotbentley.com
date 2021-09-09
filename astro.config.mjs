import { defineConfig } from 'astro/config'
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://elliotbentley.com',
  integrations: [svelte(), react()],
})

---
date: 2021-06-29
layout: ../../layouts/post.astro
title:  "Rebuilding elliotbentley.com with shiny new Astro"
---

After failing to recompile this site for 18 months, I figured it was probably time to move away from [Jekyll](https://jekyllrb.com), the influential but aging Ruby-based static site generator.

As it so happened, I made this decision just as [Astro](https://github.com/snowpackjs/astro) launched. It's a new JavaScript-based site builder that supports a tonne of stuff out of the box (React, Markdown, Sass, etc) and fast performance through "on-demand components" where client-side code only runs when needed.

It almost sounded too good to be true. After using it to rebuild this straightforward portfolio/blog site (with a fresh new design to boot), I'm pleased to report _it works_ — even if it's still a little rough around the edges.

## The good

Setup is really fast. Compared to build systems like Grunt or Webpack, Astro requires minimal configuration, and already provides handy boilerplates (for this site, I started with the [blog example](https://github.com/snowpackjs/astro/tree/main/examples/blog)). Once set up, adding new pages is just a matter of dropping files into the `/pages` directory.

The ability to switch between frameworks for individual components within even a single page, with minimal hits to performance, is amazing. To give a couple of examples, the hamburger-menu header is a [Svelte component](https://github.com/ejb/elliotbentley.com/blob/79b8236b193377b082142c635ccdf9572becfec6/src/components/SiteHeader.svelte), and the lazy-loading galleries within [my portfolio](/portfolio) use a [React component](https://github.com/ejb/elliotbentley.com/blob/79b8236b193377b082142c635ccdf9572becfec6/src/components/ScreenshotGallery.jsx). Need some CSS with those? Code within a tag like `<style lang="sass">` is automatically compiled to Sass.

The `.astro` file format is the real hero, a mix between HTML, Markdown and JSX that strikes a good balance between accessiblity and power.

## The not-so-good

Astro is definitely not yet ready for the faint of heart. The global variable `window` didn't seem to be available for client-side compoentns, regardless of library. I was able to use `globalThis` as a workaround, but that wasn't an option for third-party libraries like [svelte-watch-resize](https://www.npmjs.com/package/svelte-watch-resize).

When these issues arrived, they weren't helped by error messages being hard to track down. Sometimes they appear on the page itself, sometimes in the terminal, sometimes in the developer tools, and on occasion nowhere at all when a component fails silently.

Astro also doesn't yet provide any ways to reroute pages [the way Jekyll does](). I ended up having to migrate from GitHub Pages to Netlify in order to prevent old blog URLs from breaking. Can't risk losing my SEO on ["d3 es6"](https://www.google.com/search?q=d3+es6) after all!

## To the moon!

Work on Astro is ongoing and I'm hopeful that these kinks will be smoothed out over time. The developers are already aware of the redirect limitation, for example, and [appear to be working on a solution](https://github.com/snowpackjs/astro/issues/80). Similarly, [a bug](https://github.com/snowpackjs/astro/issues/405) in the `.astro` syntax’s handling of JSX was quickly fixed. 

Overall, Astro feels like a genuinely modern tool, one that's exciting to use and liberating in its fleibility. I wouldn't recommend it to inexperienced coders just yet, but I can't wait to see how high it goes.
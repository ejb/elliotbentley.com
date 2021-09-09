
import rss from '@astrojs/rss';

export const get = () => {

  return rss({
    title: 'Elliot Bentley’s Blog',
    description: 'Occasional posts on interactive graphics and web development.',
    customData: `<language>en-gb</language>`,
    site: import.meta.env.SITE,
    items: import.meta.glob('../blog/*.md'),
  });
};

import 'astro/jsx-runtime'
import React from 'react';
import './PortfolioHero.css';

export function PortfolioHero (props) {

  let pieces = props.pieces.slice(0,5).map((p, i) => ({
    image: p.media.find(asset => asset.type === 'image'),
    slug: p.slug,
    index: i,
  }));

  // newest out front
  pieces = [
    pieces[3],
    pieces[1],
    pieces[0],
    pieces[2],
    pieces[4],
  ]
  
  const assetMarkup = pieces.map((piece, i, arr) => {
    const zIndex = (Math.abs(i - Math.floor(arr.length/2)) * -1) + 2;
    const scale = 50 / (Math.abs(zIndex - 2) + 50);
    return (
      <div className="portfolio-asset" style={{zIndex, transform: `scale(${scale})`}} key={i}>
        <a href={`/portfolio#${piece.slug}`}>
          <img src={piece.image.url} alt='' width="1125" height="2436" />
        </a>
      </div>
    )
  });
  
  return (
    <div className="portfolio-assets">
      {assetMarkup}
    </div>
  );
}


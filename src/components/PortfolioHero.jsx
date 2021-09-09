import React, { useState } from 'react';
import './PortfolioHero.css';

export const PortfolioHero = props => {

  const pieces = props.pieces.slice(0,5).map(p => ({
    image: p.media.find(asset => asset.type === 'image'),
    slug: p.slug,
  }));
  
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


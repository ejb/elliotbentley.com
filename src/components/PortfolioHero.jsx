import React, { useState } from 'react';
import './PortfolioHero.css';

export const PortfolioHero = props => {
  const assetMarkup = props.assets.filter(asset => asset.type === 'image').map((asset, i, arr) => {
    const zIndex = Math.abs(i - Math.floor(arr.length/2)) * -1;
    const scale = 50 / (Math.abs(zIndex) + 50);
    return (
      <div className="portfolio-asset" style={{zIndex, transform: `scale(${scale})`}} key={i}>
        <img src={asset.url} alt='' width="1125" height="2436" />
      </div>
    )
  });

  return (
    <div class="portfolio-assets">
      {assetMarkup}
    </div>
  );
}


import React, { useState } from 'react';
import './AssetCarousel.css';

const video = asset => {
  return (<video autoplay loop muted playsinline poster={`${asset.poster}`}>
      <source src={`${asset.url}.webm`} type="video/webm"></source>
      <source src={`${asset.url}.mp4`} type="video/mp4"></source>
    </video>);
}

const image = asset => {
  return (
      <img src={asset.url} />
  );
}

const assetTypes = {video, image};

export default AssetPortfolio = props => {
  console.log(props.assets)
  const assetMarkup = props.assets.map(asset => (
    <div class="portfolio-asset">
      {assetTypes[asset.type](asset)}
    </div>
  ));

  return (
    <div class="portfolio-assets">
      {assetMarkup}
    </div>
  );
}


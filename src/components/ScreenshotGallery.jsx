import React, { useState } from 'react';
import "./ScreenshotGallery.css";

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

export const ScreenshotGallery = ({ media }) => {

  return <div class="screenshot-gallery">
    <ul class="screenshot-gallery-inner">
      {media.slice(0, 3).map(asset => {
        if (asset.type === 'video') {
          return (<li>{video(asset)}</li>)
        }
        return (<li>{image(asset)}</li>)
      })}
    </ul>
  </div>
}


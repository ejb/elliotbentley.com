import 'astro/jsx-runtime'
import React, { useRef } from 'react';
import LazyLoad from 'react-lazyload';
import "./ScreenshotGallery.scss";

const video = (asset) => {
  const vidRef = useRef(null);
  const onClick = () => {
    const v = vidRef.current;
    v.paused ? v.play() : v.pause();
  }
  return (<video autoPlay loop muted playsInline poster={`${asset.poster}`} onClick={onClick} ref={vidRef}>
      <source src={`${asset.url}.webm`} type="video/webm"></source>
      <source src={`${asset.url}.mp4`} type="video/mp4"></source>
    </video>);
}

const image = (asset) => {
  return (
      <img src={asset.url} />
  );
}

const assetTypes = { video, image};

export const ScreenshotGallery = ({ media, slug }) => {
  return <div className="screenshot-gallery" >
    <LazyLoad height={550} offset={500} once={true} classNamePrefix={slug.toString()}>
      <ul className="screenshot-gallery-inner">
        {media.slice(0, 3).map((asset, i) => {
          return (<li key={i}>
            {assetTypes[asset.type](asset)}
          </li>);
        })}
      </ul>
    </LazyLoad>
  </div>
}


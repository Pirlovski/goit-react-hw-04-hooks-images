import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
// import { type } from '@testing-library/user-event/dist/type';
import s from './ImageGallery.module.css';
import propTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

const ImageGallery = ({ images, open }) => {
  return (
    <>
      <ul className={s.gallery__list}>
        {images.map(({ webformatURL, tags, id }) => {
          return (
            <li
              key={shortid.generate()}
              className={s.gallery__item}
              onClick={open}
            >
              <ImageGalleryItem
                userImageURL={webformatURL}
                tags={tags}
                id={id}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: propTypes.array,
  open: propTypes.func,
};

export default ImageGallery;

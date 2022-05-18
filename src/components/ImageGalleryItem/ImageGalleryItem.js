import React from 'react';

import propTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ userImageURL, tags, id }) => {
  return (
    <div className={s.ImageGalleryItem_div} id={id}>
      <img
        className={s.ImageGalleryItem__image}
        src={userImageURL}
        alt={tags}
      />
    </div>
  );
};
ImageGalleryItem.propTypes = {
  id: propTypes.number,
  userImageURL: propTypes.string,
  tags: propTypes.string,
};

export default ImageGalleryItem;

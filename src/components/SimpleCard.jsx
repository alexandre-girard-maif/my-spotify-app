import React from 'react';
import './SimpleCard.css';

const SimpleCard = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="simple-card">
      <img
        src={imageUrl}
        alt={title}
        className="simple-card__image"
      />
      <h3 className="simple-card__title">{title}</h3>
      {subtitle && <p className="simple-card__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SimpleCard;
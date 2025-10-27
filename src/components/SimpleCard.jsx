import React from 'react';
import './SimpleCard.css';

const SimpleCard = ({ imageUrl, title, subtitle, link }) => {
  return (
    <div className="simple-card">
      <img
        src={imageUrl}
        alt={title}
        className="simple-card__image"
      />
      <h3 className="simple-card__title">{title}</h3>
      {subtitle && <p className="simple-card__subtitle">{subtitle}</p>}
      {link && (
        <a href={link} className="simple-card__button" target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      )}
    </div>
  );
};

export default SimpleCard;
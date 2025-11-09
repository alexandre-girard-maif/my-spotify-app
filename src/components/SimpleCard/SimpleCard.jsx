import './SimpleCard.css';

/**
 * SimpleCard component displays a card with an image, title, subtitle, and a link.
 * @param {*} params - Props containing imageUrl, title, subtitle, and link.
 * @returns {JSX.Element} The rendered SimpleCard component.
 */
const SimpleCard = ({ imageUrl, title, subtitle, link }) => {
  return (
    <div className="simple-card">
      <img
        src={imageUrl}
        alt={title}
        className="simple-card__image"
      />
      <h3 className="simple-card__title">{title}</h3>
      {subtitle && <p data-testid="subtitle" className="simple-card__subtitle">{subtitle}</p>}
      {link && (
        <a data-testid="link" href={link} className="simple-card__button" target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      )}
    </div>
  );
};

export default SimpleCard;
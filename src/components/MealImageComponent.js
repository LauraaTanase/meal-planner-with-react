import React from 'react';

const MealImageComponent = ({ src, alt }) => {
  return (
    <div className="card">
      <img
        src={src}
        alt={alt}
        className="card-img-top"
        style={{ objectFit: 'cover', height: '100%' }} 
      />
    </div>
  );
};

export default MealImageComponent;

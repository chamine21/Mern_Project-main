import React from "react";

const StarRating = ({ rating, color }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <i
        key={i}
        className="fas fa-star"
        style={{ color: color ? color : "gold" }} // Use custom color or fallback to "gold"
      ></i>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <i
        key={filledStars}
        className="fas fa-star-half-alt"
        style={{ color: color ? color : "gold" }} // Use custom color or fallback to "gold"
      ></i>
    );
  }

  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i
        key={filledStars + i + 1}
        className="far fa-star"
        style={{ color: color ? color : "gold" }} 
      ></i>
    );
  }

  return <>{stars}</>;
};

export default StarRating;

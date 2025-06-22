import React from 'react';

// Adjusted tilt sensitivity to be even more subtle
export const handleMouseMove = (
  event: React.MouseEvent<HTMLDivElement>
) => {
  const card = event.currentTarget;  // `event.currentTarget` is the card being hovered over
  const cardRect = card.getBoundingClientRect();

  const cardWidth = cardRect.width;
  const cardHeight = cardRect.height;

  const centerX = cardRect.left + cardWidth / 2;
  const centerY = cardRect.top + cardHeight / 2;

  const offsetX = event.clientX - centerX; // X offset from center
  const offsetY = event.clientY - centerY; // Y offset from center

  // Reduce the tilt sensitivity even further
  const rotateX = -(offsetY / cardHeight) * 15; // Reduced to 5 for more subtle effect
  const rotateY = (offsetX / cardWidth) * 15;   // Reduced to 5 for more subtle effect

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

export const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
  const card = event.currentTarget; // Get the card that was hovered
  card.style.transform = 'rotateX(0) rotateY(0)';
};

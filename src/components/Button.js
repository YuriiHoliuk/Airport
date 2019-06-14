import React from 'react';

export const Button = props => {
  const {
    isActive,
    onClick,
    children,
  } = props;

  return (
    <button
      className={`btn ${isActive ? 'is-active' : ''}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

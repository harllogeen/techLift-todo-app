import React from 'react'

const Button = ({ className, onClick, type, children }) => {
    return (
      <div>
        <button className={className} onClick={onClick} type={type}>
          {children}
        </button>
      </div>
    );
  };
  

export default Button

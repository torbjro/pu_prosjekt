import React, { FC } from 'react';

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const buttonStyle = 'bg-violet-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-violet-700 focus:outline-none focus:shadow-outline';

const Button: FC<ButtonProps> = ({ onClick, children }) => (
  <button className={buttonStyle} onClick={onClick}>{children}</button>
);

export default Button;
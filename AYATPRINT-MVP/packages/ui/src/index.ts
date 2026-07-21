import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-xl shadow-sm focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-stone-900 text-white hover:bg-black',
    secondary: 'bg-stone-100 text-stone-900 hover:bg-stone-200',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold hover:from-amber-400 hover:to-amber-500',
    outline: 'border border-stone-300 text-stone-700 hover:bg-stone-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

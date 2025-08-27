import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
}

const Card: React.FC<CardProps> = ({ children, className, variant = 'default', ...props }) => {
  const baseClasses = "bg-white rounded-2xl transition-all duration-300 border";
  
  const variantClasses = {
    default: 'shadow-lg hover:shadow-xl border-[#f3e9d2] p-6',
    elevated: 'shadow-xl hover:shadow-2xl border-[#CDA047]/20 p-6 hover:border-[#CDA047]/40',
    outlined: 'shadow-sm hover:shadow-lg border-[#CDA047] border-2 p-6 hover:bg-[#fffbe6]/50',
    glass: 'shadow-lg hover:shadow-xl border-[#f3e9d2] backdrop-blur-sm bg-white/90 p-6',
  };

  return (
    <div
      {...props}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;

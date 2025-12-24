import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`rounded shadow-[0_0.5px_1px_0_rgba(0,0,0,0.15)] border-[0.5px] border-[#dadada] bg-white ${className}`}
    >
      {children}
    </div>
  );
};

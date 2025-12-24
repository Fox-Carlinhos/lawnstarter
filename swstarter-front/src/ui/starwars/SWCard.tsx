import type { ReactNode } from "react";

interface SWCardProps {
  children: ReactNode;
  className?: string;
}

export const SWCard = ({ children, className = "" }: SWCardProps) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-lg
        bg-[#1a1a2e]
        border border-[#4a9eff]/20
        shadow-[0_0_20px_rgba(0,212,255,0.1)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

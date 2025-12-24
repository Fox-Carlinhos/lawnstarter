import type { ReactNode } from "react";
import { SWHeader } from "./SWHeader";

interface SWLayoutProps {
  children: ReactNode;
}

export const SWLayout = ({ children }: SWLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col relative overflow-hidden font-starwars">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4a9eff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ffd700]/5 rounded-full blur-3xl" />
        <div className="stars" />
      </div>

      <SWHeader />

      <main className="relative z-10 flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-[1024px]">{children}</div>
      </main>
    </div>
  );
};

import type { ReactNode } from "react";
import { Header } from "../components/Header";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#ededed] flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center px-4 py-6">
        <div className="w-full max-w-[1024px]">{children}</div>
      </main>
    </div>
  );
};

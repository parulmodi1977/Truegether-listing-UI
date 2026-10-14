import type { ReactNode } from "react";
import Header from "@/components/Header/Header";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">{children}</main>
      {/* Footer will be added here once built */}
    </div>
  );
}

export default MainLayout;
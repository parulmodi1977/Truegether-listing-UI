import type { ReactNode } from "react";
import Header from "@/components/Header/Header.tsx";
import MobileHeader from "@/components/Header/MobileHeader";
import Footer from "@/components/Footer/Footer.tsx";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MobileHeader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;

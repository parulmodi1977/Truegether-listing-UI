import type { ReactNode } from "react";

interface TrustBarItemProps {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

function TrustBarItem({ icon, children, className = "" }: TrustBarItemProps) {
  return (
    <div className={`flex items-center gap-1.5 text-[13px] text-gray-600 ${className}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default TrustBarItem;

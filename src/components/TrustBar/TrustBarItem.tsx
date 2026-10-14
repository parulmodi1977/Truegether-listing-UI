import type { ReactNode } from "react";

interface TrustBarItemProps {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

function TrustBarItem({ icon, children, className = "" }: TrustBarItemProps) {
  return (
    <div className={`flex shrink-0 items-center gap-1.5 text-[11px] text-gray-600 ${className}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default TrustBarItem;

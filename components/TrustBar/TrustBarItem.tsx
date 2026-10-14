import type { ReactNode } from "react";

interface TrustBarItemProps {
  icon: ReactNode;
  label: string;
}

function TrustBarItem({ icon, label }: TrustBarItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default TrustBarItem;

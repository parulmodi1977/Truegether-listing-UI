import type { ReactNode } from "react";

interface QuickFactRowProps {
  label: string;
  value: ReactNode;
  underline?: boolean;
}

function QuickFactRow({ label, value, underline = false }: QuickFactRowProps) {
  return (
    <div className="flex items-center justify-between py-0.5 text-xs">
      <span className="text-gray-500">{label}</span>
      <span
        className={`text-gray-800 ${underline ? "underline decoration-gray-300 underline-offset-2" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

export default QuickFactRow;

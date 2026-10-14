import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SPECIFICATIONS = [
  ["Brand", "Intertek"],
  ["Type", "Desk Lamp"],
  ["Material", "Chrome, Marble, Copper"],
  ["Color", "Gold"],
  ["Style", "Modern"],
  ["Design", "Mid Century"],
  ["Features", "Easy Installation"],
  ["Control Style", "Rotary Knob"],
  ["Power Source", "Corded Electric"],
  ["Energy Rating", "3 Stars"],
  ["Department", "Unisex Adult"],
  ["Size", "Medium"],
  ["Light Color", "Clear"],
  ["Cord Color", "Clear"],
  ["Pattern", "Modern"],
  ["MPN", "HX-T0994CA"],
  ["Original/Reproduction", "Original"],
  ["Time Period Manufactured", "2010-2019"],
  ["Vintage", "No"],
  ["Antique", "No"],
];

const COLLAPSED_COUNT = 8;

function ItemSpecifications() {
  const [expanded, setExpanded] = useState(false);
  const visibleSpecifications = expanded ? SPECIFICATIONS : SPECIFICATIONS.slice(0, COLLAPSED_COUNT);
  const hasMore = SPECIFICATIONS.length > COLLAPSED_COUNT;
  const midpoint = Math.ceil(visibleSpecifications.length / 2);
  const specificationColumns = [
    visibleSpecifications.slice(0, midpoint),
    visibleSpecifications.slice(midpoint),
  ];

  return (
    <section className="mt-8 rounded-sm border border-gray-100 bg-white px-5 py-6 sm:px-8">
      <h2 className="text-xl font-bold text-gray-900">Item Specifications</h2>

      <dl className="mt-5 grid grid-cols-1 gap-x-12 lg:grid-cols-2 lg:divide-x lg:divide-gray-100">
        {specificationColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={columnIndex === 1 ? "lg:pl-12" : ""}
          >
            {column.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-6 border-b border-gray-100 py-3 text-sm last:border-b-0"
              >
                <dt className="font-bold text-gray-900">{label}</dt>
                <dd className="text-gray-900">{value}</dd>
              </div>
            ))}
          </div>
        ))}
      </dl>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex h-11 min-w-40 items-center justify-center gap-2 rounded border border-emerald-900/40 bg-white px-8 text-sm font-semibold text-gray-900 transition-colors hover:border-emerald-900 hover:text-emerald-900"
          >
            {expanded ? "View Less" : "View More"}
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      )}
    </section>
  );
}

export default ItemSpecifications;

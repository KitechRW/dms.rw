"use client";

import { useMemo, useState } from "react";
import OperatorHeader from "../components/header";
import OperatorSidebar from "../components/sidebar";

const summaryCards = [
  {
    label: "TOTAL VOLUME (MTD)",
    value: "142,830",
    suffix: "L",
    note: "+8.2% vs last month",
    noteClass: "text-[#047857]",
  },
  {
    label: "COLLECTION RATE",
    value: "98.2%",
    progress: 98,
  },
  {
    label: "PENDING VERIFICATION",
    value: "23",
    note: "Requires attention",
    noteClass: "text-[#B45309]",
  },
];

const collections = [
  {
    id: "MC-2024-001",
    farmer: "Johnathan Miller",
    farmerCode: "#FR-8921",
    cooperative: "Kigali Dairy Coop",
    volume: "1,240.50",
    fat: "3.8%",
    status: "Accepted",
    date: "2024-01-15",
    time: "08:30",
  },
  {
    id: "MC-2024-002",
    farmer: "Sarah Henderson",
    farmerCode: "#FR-4412",
    cooperative: "Muhanga Farmers",
    volume: "840.00",
    fat: "4.1%",
    status: "Pending",
    date: "2024-01-15",
    time: "09:15",
  },
  {
    id: "MC-2024-003",
    farmer: "David Chen",
    farmerCode: "#FR-3119",
    cooperative: "Nyagatare Milk Union",
    volume: "450.25",
    fat: "3.6%",
    status: "Accepted",
    date: "2024-01-15",
    time: "10:05",
  },
  {
    id: "MC-2024-004",
    farmer: "Elena Rodriguez",
    farmerCode: "#FR-9022",
    cooperative: "Huye Dairy Group",
    volume: "1,890.00",
    fat: "4.0%",
    status: "Accepted",
    date: "2024-01-15",
    time: "10:42",
  },
  {
    id: "MC-2024-005",
    farmer: "Thomas Wright",
    farmerCode: "#FR-5561",
    cooperative: "Rubavu Cooperative",
    volume: "1,120.40",
    fat: "3.9%",
    status: "Accepted",
    date: "2024-01-15",
    time: "11:20",
  },
];

const statusStyles = {
  Accepted: "w-[76px] bg-[#D1FAE5] text-[#047857]",
  Pending: "w-[66px] bg-[#FEF3C7] text-[#B45309]",
  Rejected: "w-[68px] bg-[#FFDAD6] text-[#B42318]",
};

function PlusIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="872.89 99.75 10.5 10.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M877.39 105.75H872.89V104.25H877.39V99.75H878.89V104.25H883.39V105.75H878.89V110.25H877.39V105.75Z" />
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="36 22.5 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M52.6 40.5L46.3 34.2C45.8 34.6 45.225 34.9167 44.575 35.15C43.925 35.3833 43.2333 35.5 42.5 35.5C40.6833 35.5 39.1458 34.8708 37.8875 33.6125C36.6292 32.3542 36 30.8167 36 29C36 27.1833 36.6292 25.6458 37.8875 24.3875C39.1458 23.1292 40.6833 22.5 42.5 22.5C44.3167 22.5 45.8542 23.1292 47.1125 24.3875C48.3708 25.6458 49 27.1833 49 29C49 29.7333 48.8833 30.425 48.65 31.075C48.4167 31.725 48.1 32.3 47.7 32.8L54 39.1L52.6 40.5ZM42.5 33.5C43.75 33.5 44.8125 33.0625 45.6875 32.1875C46.5625 31.3125 47 30.25 47 29C47 27.75 46.5625 26.6875 45.6875 25.8125C44.8125 24.9375 43.75 24.5 42.5 24.5C41.25 24.5 40.1875 24.9375 39.3125 25.8125C38.4375 26.6875 38 27.75 38 29C38 30.25 38.4375 31.3125 39.3125 32.1875C40.1875 33.0625 41.25 33.5 42.5 33.5Z" />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 12 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PageChevronIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 8 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 1.5L1.5 6L5.5 10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FilterSelect({ label, value, width, onChange, options }) {
  return (
    <div style={{ width }} className="shrink-0">
      <label className="mb-[7px] block text-[13px] font-medium leading-[17px] text-[#444651]">
        {label}
      </label>
      <div className="relative">
        <select
          className="h-[34px] w-full appearance-none rounded border border-[#C5C5D3] bg-white px-3 pr-8 text-left text-[14px] leading-5 text-[#141B2B] outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-2 w-3 -translate-y-1/2 text-[#6B7280]" />
      </div>
    </div>
  );
}

export default function OperatorDashboardPage() {
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    status: "All Status",
    cooperative: "All Cooperatives",
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  const cooperativeOptions = useMemo(
    () => [
      "All Cooperatives",
      ...Array.from(new Set(collections.map((entry) => entry.cooperative))),
    ],
    []
  );

  const filteredCollections = useMemo(() => {
    const query = appliedFilters.search.trim().toLowerCase();

    return collections.filter((entry) => {
      const matchesSearch =
        !query ||
        entry.id.toLowerCase().includes(query) ||
        entry.farmer.toLowerCase().includes(query) ||
        entry.farmerCode.toLowerCase().includes(query) ||
        entry.cooperative.toLowerCase().includes(query);
      const matchesStatus =
        appliedFilters.status === "All Status" ||
        entry.status === appliedFilters.status;
      const matchesCooperative =
        appliedFilters.cooperative === "All Cooperatives" ||
        entry.cooperative === appliedFilters.cooperative;

      return matchesSearch && matchesStatus && matchesCooperative;
    });
  }, [appliedFilters]);

  const updateDraftFilter = (key, value) => {
    setDraftFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    const emptyFilters = {
      search: "",
      status: "All Status",
      cooperative: "All Cooperatives",
    };
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] text-[#141B2B]">
      <div className="flex min-h-screen min-w-[1280px]">
        <OperatorSidebar activeItem="Milk Collection" />

        <div className="w-[1020px] shrink-0">
          <OperatorHeader variant="milk" />

          <main className="relative h-[960px] w-full bg-[#F9F9FF] px-6 pt-[25px]">
            <section className="flex items-start justify-between">
              <div>
                <h1 className="text-[25px] font-bold leading-[30px] text-[#141B2B]">
                  All Milk Collections
                </h1>
                <p className="mt-[7px] text-[15px] leading-5 text-[#6B7280]">
                  Track and manage all milk collection transactions.
                </p>
              </div>

              <button
                type="button"
                className="mt-[-1px] inline-flex h-[34px] w-[139px] items-center justify-center gap-[9px] rounded bg-[#1E3A8A] text-[13px] font-medium leading-[17px] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              >
                <PlusIcon className="h-[11px] w-[11px]" />
                <span>New Collection</span>
              </button>
            </section>

            <section className="mt-[58px] grid grid-cols-3 gap-[16px]">
              {summaryCards.map((card) => (
                <article
                  key={card.label}
                  className="h-[133px] rounded border border-[#E5E7EB] bg-white px-[20px] py-[22px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  <p className="text-[12px] font-bold leading-4 text-[#444651]">
                    {card.label}
                  </p>
                  <p className="mt-[12px] flex items-baseline gap-2 text-[30px] font-bold leading-[36px] text-[#141B2B]">
                    <span>{card.value}</span>
                    {card.suffix && (
                      <span className="text-[18px] font-semibold leading-6 text-[#141B2B]">
                        {card.suffix}
                      </span>
                    )}
                  </p>
                  {card.progress ? (
                    <div className="mt-[12px]">
                      <div className="h-[6px] overflow-hidden rounded-full bg-[#F1F3FF]">
                        <div
                          className="h-full rounded-full bg-[#1E3A8A]"
                          style={{ width: `${card.progress}%` }}
                        />
                      </div>
                      {card.note && (
                        <p className={`mt-[8px] text-[14px] leading-5 ${card.noteClass}`}>
                          {card.note}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className={`mt-[8px] text-[14px] leading-5 ${card.noteClass}`}>
                      {card.note}
                    </p>
                  )}
                </article>
              ))}
            </section>

            <section className="mt-[23px] h-[91px] rounded border border-[#E5E7EB] bg-white px-[20px] py-[17px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex items-end gap-[23px]">
                <div className="w-[182px] shrink-0">
                  <label className="mb-[7px] block text-[13px] font-medium leading-[17px] text-[#444651]">
                    Search
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-[11px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#C5C5D3]" />
                    <input
                      className="h-[34px] w-full rounded border border-[#C5C5D3] bg-white pl-[34px] pr-3 text-[14px] text-[#141B2B] outline-none placeholder:text-[#6B7280]"
                      placeholder="Farmer, ID, or route..."
                      type="search"
                      value={draftFilters.search}
                      onChange={(event) =>
                        updateDraftFilter("search", event.target.value)
                      }
                    />
                  </div>
                </div>

                <FilterSelect
                  label="Status"
                  value={draftFilters.status}
                  width={191}
                  onChange={(value) => updateDraftFilter("status", value)}
                  options={["All Status", "Accepted", "Pending", "Rejected"]}
                />
                <FilterSelect
                  label="Cooperative"
                  value={draftFilters.cooperative}
                  width={240}
                  onChange={(value) => updateDraftFilter("cooperative", value)}
                  options={cooperativeOptions}
                />

                <button
                  type="button"
                  className="ml-auto inline-flex h-8 w-[114px] items-center justify-center rounded bg-[#1E3A8A] text-[13px] font-semibold leading-[17px] text-white"
                  onClick={() => setAppliedFilters(draftFilters)}
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 w-[68px] items-center justify-center rounded text-[13px] font-medium leading-[17px] text-[#444651]"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </section>

            <section className="mt-6 h-[409px] overflow-hidden rounded border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <table className="w-full table-fixed text-left">
                <thead>
                  <tr className="h-[41px] border-b border-[#E5E7EB] bg-[#F3F4F6] text-[12px] font-bold uppercase leading-4 text-[#141B2B]">
                    <th className="w-[18.3%] pl-6 pr-4">Date/Time</th>
                    <th className="w-[20.2%] pl-[20px] pr-4">Farmer</th>
                    <th className="w-[20.5%] px-4">Cooperative</th>
                    <th className="w-[14.2%] px-4 text-center">Volume (L)</th>
                    <th className="w-[14%] px-4 text-center">Status</th>
                    <th className="w-[12.8%] px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] leading-5">
                  {filteredCollections.map((entry) => (
                    <tr
                      key={entry.id}
                      className="h-[63px] border-b border-[#E5E7EB] last:border-b-0"
                    >
                      <td className="pl-6 pr-4 font-medium text-[#141B2B]">
                        {entry.date} {entry.time}
                      </td>
                      <td className="pl-[20px] pr-4">
                        <div className="text-[14px] font-bold leading-[17px] text-[#1E3A8A]">
                          {entry.farmer}
                        </div>
                        <div className="mt-[1px] text-[11px] font-normal leading-[13px] text-[#6B7280]">
                          {entry.farmerCode}
                        </div>
                      </td>
                      <td className="px-4 text-[#141B2B]">{entry.cooperative}</td>
                      <td className="px-4 text-center font-bold text-[#141B2B]">{entry.volume}</td>
                      <td className="px-4 text-center">
                        <span
                          className={`inline-flex h-[18px] items-center justify-center rounded-full text-[11px] font-bold leading-[13px] ${statusStyles[entry.status]}`}
                        >
                          {entry.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 text-center" aria-label={`Actions for ${entry.id}`} />
                    </tr>
                  ))}
                  {filteredCollections.length === 0 && (
                    <tr className="h-[63px]">
                      <td
                        className="px-5 text-[14px] text-[#6B7280]"
                        colSpan={6}
                      >
                        No collections match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex h-[47px] items-center justify-end border-t border-[#E5E7EB] bg-[#F3F4F6] px-[18px] text-[12px] font-medium leading-4 text-[#141B2B]">
                <div className="flex items-center gap-[9px]">
                  <button
                    type="button"
                    aria-label="Previous page"
                    className="inline-flex h-[22px] w-[22px] items-center justify-center rounded border border-[#D1D5DB] bg-[#F9FAFB] text-[#C5C5D3]"
                  >
                    <PageChevronIcon className="h-[10px] w-[7px]" />
                  </button>
                  <button
                    type="button"
                    className="h-[24px] w-[24px] rounded bg-[#1E3A8A] text-[12px] font-bold text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="h-[24px] w-[16px] text-[12px] font-medium text-[#444651]"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="h-[24px] w-[16px] text-[12px] font-medium text-[#444651]"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    aria-label="Next page"
                    className="inline-flex h-[22px] w-[22px] items-center justify-center rounded border border-[#D1D5DB] bg-white text-[#141B2B]"
                  >
                    <PageChevronIcon className="h-[10px] w-[7px] rotate-180" />
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
